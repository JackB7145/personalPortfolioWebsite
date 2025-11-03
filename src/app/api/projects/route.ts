import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate GitHub API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const projects = [
    {
      id: '1',
      name: 'API Gateway System',
      description: 'Microservices API gateway with authentication, rate limiting, and routing',
      fullDescription: 'Built a comprehensive API gateway system that handles authentication, rate limiting, and intelligent routing across 15+ microservices. Implemented JWT-based authentication, Redis caching for optimal performance, and comprehensive API documentation using Swagger.',
      techStack: ['Node.js', 'Express', 'Redis', 'Docker', 'JWT', 'Swagger'],
      stars: 234,
      forks: 45,
      url: 'https://github.com/jackbranston/api-gateway',
      features: [
        'JWT-based authentication with refresh tokens',
        'Rate limiting with Redis (1000 req/min per user)',
        'Smart routing across 15+ microservices',
        'Comprehensive Swagger documentation',
        'Docker containerization for easy deployment',
        'Real-time monitoring dashboard',
      ],
      metrics: {
        uptime: '99.9%',
        avgResponseTime: '45ms',
        requestsPerDay: '500K+',
      },
    },
    {
      id: '2',
      name: 'Real-Time Analytics Dashboard',
      description: 'WebSocket-powered dashboard processing 100k+ events per minute',
      fullDescription: 'Developed a high-performance real-time analytics dashboard that processes over 100,000 events per minute using WebSockets and React. Features optimized rendering with React.memo, virtual scrolling for large datasets, and custom D3.js visualizations.',
      techStack: ['React', 'WebSocket', 'D3.js', 'Node.js', 'MongoDB', 'Redis'],
      stars: 189,
      forks: 32,
      url: 'https://github.com/jackbranston/analytics-dashboard',
      features: [
        'Real-time event processing (100K+ events/min)',
        'WebSocket connections with auto-reconnect',
        'Optimized rendering with React.memo',
        'Virtual scrolling for large datasets',
        'Custom D3.js visualizations for time-series data',
        'MongoDB aggregation for historical analytics',
      ],
      metrics: {
        eventsPerMinute: '100K+',
        concurrentUsers: '5000+',
        dataRetention: '90 days',
      },
    },
    {
      id: '3',
      name: 'AI Code Review Assistant',
      description: 'GPT-4 powered code review tool with context-aware suggestions',
      fullDescription: 'Created an AI-powered code review assistant that uses GPT-4 to provide intelligent, context-aware code suggestions. Integrates with GitHub PRs, analyzes code patterns, and provides actionable feedback on code quality, security, and best practices.',
      techStack: ['Python', 'GPT-4', 'FastAPI', 'GitHub API', 'PostgreSQL', 'Docker'],
      stars: 567,
      forks: 89,
      url: 'https://github.com/jackbranston/ai-code-reviewer',
      features: [
        'GPT-4 integration for intelligent code analysis',
        'GitHub PR integration with webhooks',
        'Security vulnerability detection',
        'Code style and best practice suggestions',
        'Learning from team coding patterns',
        'Customizable review templates',
      ],
      metrics: {
        accuracy: '92%',
        prsReviewed: '10K+',
        avgReviewTime: '30 seconds',
      },
    },
    {
      id: '4',
      name: 'Blockchain Event Tracker',
      description: 'Track and analyze on-chain events with real-time notifications',
      fullDescription: 'Built a comprehensive blockchain event tracking system that monitors smart contract events in real-time. Features include custom event filters, webhook notifications, historical data analysis, and support for multiple blockchain networks.',
      techStack: ['TypeScript', 'Ethers.js', 'Next.js', 'PostgreSQL', 'WebSocket', 'Redis'],
      stars: 312,
      forks: 67,
      url: 'https://github.com/jackbranston/blockchain-tracker',
      features: [
        'Real-time blockchain event monitoring',
        'Support for Ethereum, Polygon, BSC',
        'Custom event filters and alerts',
        'Webhook notifications for critical events',
        'Historical data analysis and charts',
        'Smart contract interaction interface',
      ],
      metrics: {
        networks: '3',
        eventsTracked: '1M+',
        alertLatency: '<3s',
      },
    },
  ];

  return NextResponse.json(projects);
}
