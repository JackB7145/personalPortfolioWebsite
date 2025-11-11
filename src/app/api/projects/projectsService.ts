import { GITHUB_TOKEN } from '@/env'

export interface ProjectConfig {
  name?: string
  description?: string
  fullDescription?: string
  techStack?: string[]
  features?: string[]
  metrics?: {
    commits?: string | number
    pullRequests?: string | number
    linesOfCode?: string
  }
}

export interface ProjectData {
  id: string
  name: string
  description: string | null
  fullDescription: string
  techStack: string[]
  stars: number
  forks: number
  url: string
  features: string[]
  metrics: {
    commits: string | number
    pullRequests: string | number
    linesOfCode: string
  }
}

const GITHUB_API = 'https://api.github.com'
const username = 'JackB7145'
const token = GITHUB_TOKEN

// ─────────────────────────────────────────────
// Base GitHub fetch helper
// ─────────────────────────────────────────────
async function githubFetch(endpoint: string) {
  const res = await fetch(`${GITHUB_API}${endpoint}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 120 },
  })

  if (!res.ok) throw new Error(`GitHub API error: ${res.status} for ${endpoint}`)
  return res.json()
}

// ─────────────────────────────────────────────
// Get projectConfig.json from root (optional)
// ─────────────────────────────────────────────
async function getProjectConfig(owner: string, repo: string): Promise<ProjectConfig | null> {
  try {
    const res = await githubFetch(`/repos/${owner}/${repo}/contents/projectConfig.json`)
    if (!res?.content) return null

    const jsonStr = Buffer.from(res.content, 'base64').toString('utf8')
    return JSON.parse(jsonStr)
  } catch {
    // Repo likely has no projectConfig.json
    return null
  }
}

// ─────────────────────────────────────────────
// Get line count (approx) via /languages
// ─────────────────────────────────────────────
async function getLinesOfCode(owner: string, repo: string): Promise<string> {
  try {
    const data = await githubFetch(`/repos/${owner}/${repo}/languages`)
    const total = Object.values(data).reduce((sum: number, val: any) => sum + val, 0)
    return `~${total.toLocaleString()} LOC`
  } catch {
    return '~N/A'
  }
}

// ─────────────────────────────────────────────
// Main controller — no commit history
// ─────────────────────────────────────────────
export async function getStarredProjects(): Promise<ProjectData[]> {
  const starredRepos = await githubFetch(`/users/${username}/starred?sort=updated&direction=desc`)

  const projects = await Promise.all(
    starredRepos.map(async (repo: any) => {
      const [config, linesOfCode] = await Promise.all([
        getProjectConfig(repo.owner.login, repo.name),
        getLinesOfCode(repo.owner.login, repo.name),
      ])

      const metrics = config?.metrics || {
        commits: '-',
        pullRequests: repo.open_issues_count ?? 0,
        linesOfCode,
      }

      return {
        id: repo.id.toString(),
        name: config?.name || repo.name,
        description: config?.description || repo.description,
        fullDescription: config?.fullDescription || repo.description || '',
        techStack: config?.techStack || [repo.language || 'Unknown'],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        features: config?.features || [],
        metrics,
      }
    })
  )

  return projects
}
