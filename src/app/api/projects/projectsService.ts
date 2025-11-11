import {GITHUB_TOKEN} from '@/env'

export interface CommitInfo {
  sha: string;
  message: string;
  author?: string;
  date?: string;
  url: string;
}

export interface ProjectData {
  id: string;
  name: string;
  description: string | null;
  fullDescription: string;
  techStack: string[];
  stars: number;
  forks: number;
  url: string;
  features: string[];
  metrics: {
    commits: string | number;
    pullRequests: string | number;
    linesOfCode: string;
  };
  commitHistory: CommitInfo[];
}

const GITHUB_API = 'https://api.github.com';
const username = 'JackB7145';
const token = GITHUB_TOKEN;

// Helper for authenticated fetches
async function githubFetch(endpoint: string) {
  const res = await fetch(`${GITHUB_API}${endpoint}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 120 },
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status} for ${endpoint}`);
  return res.json();
}

// Fetch most recent commits for a repo
async function getCommitHistory(owner: string, repo: string, perPage = 5): Promise<CommitInfo[]> {
  try {
    const data = await githubFetch(`/repos/${owner}/${repo}/commits?per_page=${perPage}`);
    return data.map((c: any) => ({
      sha: c.sha,
      message: c.commit.message,
      author: c.commit.author?.name,
      date: c.commit.author?.date,
      url: c.html_url,
    }));
  } catch {
    return [];
  }
}

// Fetch approximate lines of code from /languages endpoint
async function getLinesOfCode(owner: string, repo: string): Promise<string> {
  try {
    const data = await githubFetch(`/repos/${owner}/${repo}/languages`);
    const total = Object.values(data).reduce((sum: number, val: any) => sum + val, 0);
    return `~${total.toLocaleString()} LOC`;
  } catch {
    return '~N/A';
  }
}

export async function getStarredProjects(): Promise<ProjectData[]> {
  const starredRepos = await githubFetch(`/users/${username}/starred`);

  const projects = await Promise.all(
    starredRepos.map(async (repo: any) => {
      const [commitHistory, linesOfCode] = await Promise.all([
        getCommitHistory(repo.owner.login, repo.name),
        getLinesOfCode(repo.owner.login, repo.name),
      ]);

      return {
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description,
        fullDescription: repo.description || '',
        techStack: [repo.language || 'Unknown'],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        features: [],
        metrics: {
          commits: commitHistory.length,
          pullRequests: repo.open_issues_count ?? 0,
          linesOfCode,
        },
        commitHistory,
      };
    })
  );

  return projects;
}
