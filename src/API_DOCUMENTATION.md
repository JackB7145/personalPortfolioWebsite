# API Documentation

This document describes all API routes available in the Jack Branston Portfolio application.

## Base URL

All API routes are relative to the application root:
```
http://localhost:3000/api/
```

## API Routes

### 1. Personal Information

**Endpoint**: `/api/personal-info`  
**Method**: `GET`  
**Simulates**: Basic profile data  
**Delay**: 100ms

#### Response Schema
```typescript
{
  name: string;              // Full name
  title: string;             // Job title
  bio: string;               // Personal bio/description
  email: string;             // Contact email
  phone: string;             // Phone number
  location: string;          // Current location
  github: string;            // GitHub profile URL
  linkedin: string;          // LinkedIn profile URL
  twitter: string;           // Twitter/X profile URL
  school: string;            // University name
  degree: string;            // Degree title
  graduationYear: string;    // Year of graduation
}
```

#### Example Response
```json
{
  "name": "JACK BRANSTON",
  "title": "Software Developer",
  "bio": "Building scalable applications with modern technologies...",
  "email": "jack@jackbranston.com",
  "phone": "+1 (555) 123-4567",
  "location": "Toronto, ON",
  "github": "https://github.com/jackbranston",
  "linkedin": "https://linkedin.com/in/jackbranston",
  "twitter": "https://twitter.com/jackbranston",
  "school": "University of Toronto",
  "degree": "Bachelor of Computer Science",
  "graduationYear": "2024"
}
```

---

### 2. Projects

**Endpoint**: `/api/projects`  
**Method**: `GET`  
**Simulates**: GitHub API - repository information  
**Delay**: 200ms

#### Response Schema
```typescript
Array<{
  id: string;                // Unique project ID
  name: string;              // Project name
  description: string;       // Short description
  fullDescription: string;   // Detailed description
  techStack: string[];       // Technologies used
  stars: number;             // GitHub stars count
  forks: number;             // GitHub forks count
  url: string;               // GitHub repository URL
  features: string[];        // List of key features
  metrics: {                 // Project performance metrics
    [key: string]: string;
  };
}>
```

#### Example Response
```json
[
  {
    "id": "1",
    "name": "API Gateway System",
    "description": "Microservices API gateway with authentication, rate limiting, and routing",
    "fullDescription": "Built a comprehensive API gateway system...",
    "techStack": ["Node.js", "Express", "Redis", "Docker", "JWT", "Swagger"],
    "stars": 234,
    "forks": 45,
    "url": "https://github.com/jackbranston/api-gateway",
    "features": [
      "JWT-based authentication with refresh tokens",
      "Rate limiting with Redis (1000 req/min per user)",
      "Smart routing across 15+ microservices"
    ],
    "metrics": {
      "uptime": "99.9%",
      "avgResponseTime": "45ms",
      "requestsPerDay": "500K+"
    }
  }
]
```

---

### 3. Experiences

**Endpoint**: `/api/experiences`  
**Method**: `GET`  
**Simulates**: LinkedIn API - work experience  
**Delay**: 150ms

#### Response Schema
```typescript
Array<{
  id: string;              // Unique experience ID
  title: string;           // Job title/position
  company: string;         // Company name
  location: string;        // Work location
  duration: string;        // Time period (e.g., "Jan 2024 - Present")
  description: string;     // Role description
  achievements: string[];  // List of key achievements
  type: string;           // Employment type (full-time, part-time, etc.)
}>
```

#### Example Response
```json
[
  {
    "id": "1",
    "title": "Software Developer",
    "company": "Scotiabank",
    "location": "Toronto, ON",
    "duration": "Jan 2024 - Present",
    "description": "Developing large-scale banking applications...",
    "achievements": [
      "Reduced API response time by 45% through caching optimization",
      "Built automated testing pipeline that reduced bugs by 60%",
      "Mentored 3 junior developers on best practices"
    ],
    "type": "full-time"
  }
]
```

---

### 4. Skills

**Endpoint**: `/api/skills`  
**Method**: `GET`  
**Simulates**: Skills profile data  
**Delay**: 100ms

#### Response Schema
```typescript
Array<{
  id: string;         // Unique category ID
  category: string;   // Skill category name
  skills: string[];   // List of skills in category
}>
```

#### Example Response
```json
[
  {
    "id": "1",
    "category": "Languages",
    "skills": ["TypeScript", "JavaScript", "Python", "Java", "Go", "SQL"]
  },
  {
    "id": "2",
    "category": "Frontend",
    "skills": ["React", "Next.js", "Vue.js", "TailwindCSS", "Redux", "Motion"]
  }
]
```

---

### 5. Time Slots

**Endpoint**: `/api/time-slots`  
**Method**: `GET`  
**Simulates**: Google Calendar API - available booking slots  
**Delay**: 150ms

#### Response Schema
```typescript
Array<{
  id: string;          // Unique slot ID
  date: string;        // Date (e.g., "Nov 5")
  time: string;        // Time (e.g., "10:00 AM")
  available: boolean;  // Availability status
}>
```

#### Example Response
```json
[
  {
    "id": "1",
    "date": "Nov 5",
    "time": "10:00 AM",
    "available": true
  },
  {
    "id": "2",
    "date": "Nov 5",
    "time": "2:00 PM",
    "available": false
  }
]
```

---

## Component Usage

### Fetching in Components

All components use React hooks to fetch data:

```typescript
const [data, setData] = useState<DataType[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('/api/endpoint')
    .then(res => res.json())
    .then(data => {
      // Transform data into Card classes
      const cards = data.map(item => new CardClass(...));
      setData(cards);
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to fetch:', err);
      setLoading(false);
    });
}, []);
```

### Loading States

All components display loading indicators while fetching:

```tsx
if (loading) {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-red-500">Loading...</div>
    </section>
  );
}
```

---

## Error Handling

- All API routes include simulated delays to mimic real network conditions
- Components have error handling with try-catch blocks
- Failed requests log errors to console
- Loading states prevent rendering before data is available

---

## Data Transformation

API responses are transformed into TypeScript classes for type safety:

```typescript
// API Response → Card Classes
fetch('/api/projects')
  .then(res => res.json())
  .then(data => {
    const projectCards = data.map(proj => new ProjectCard(
      proj.id,
      proj.name,
      proj.description,
      proj.techStack,
      proj.stars,
      proj.forks,
      proj.url,
      proj.fullDescription,
      proj.features,
      proj.metrics
    ));
    setProjects(projectCards);
  });
```

### Card Classes

All card classes extend `BaseCard` abstract class:

```typescript
abstract class BaseCard {
  abstract getTitle(): string;
  abstract getDescription(): string;
  abstract getType(): 'project' | 'experience' | 'skill';
}
```

This provides:
- Consistent interface across card types
- Type safety with TypeScript
- Encapsulation of business logic
- Polymorphic behavior

---

## Performance Considerations

### API Delays
- Simulated delays range from 100ms to 200ms
- Delays make loading states visible in development
- Production would use real API response times

### Caching
- No caching implemented (demo application)
- Production would benefit from:
  - React Query for server state management
  - SWR for stale-while-revalidate
  - Next.js API route caching

### Data Size
- All responses are small (< 10KB)
- No pagination needed for demo data
- Production would implement pagination for large datasets

---

## Future Enhancements

Potential improvements for production:

1. **Real API Integration**
   - Connect to actual GitHub API
   - Integrate LinkedIn API
   - Use Google Calendar API

2. **Database Backend**
   - Store data in PostgreSQL/MongoDB
   - User authentication
   - Admin panel for content management

3. **Advanced Features**
   - Real-time updates with WebSockets
   - Search and filtering
   - Analytics tracking
   - SEO optimization

4. **Performance**
   - Server-side rendering (SSR)
   - Static site generation (SSG)
   - Image optimization
   - Code splitting

---

## Testing APIs

Use curl or any HTTP client:

```bash
# Get personal info
curl http://localhost:3000/api/personal-info

# Get projects
curl http://localhost:3000/api/projects

# Get experiences
curl http://localhost:3000/api/experiences

# Get skills
curl http://localhost:3000/api/skills

# Get time slots
curl http://localhost:3000/api/time-slots
```

---

## Support

For questions or issues with the API implementation, refer to:
- `/lib/cardTypes.ts` - Card class definitions
- `/components/*.tsx` - Component implementations
- `/app/api/*/route.ts` - API route handlers
