import { NextResponse } from 'next/server';
import { projects as dummyProjects } from './dummy';
import { getStarredProjects } from './projectsService';
import { ENVIRONEMENT } from '@/env'

export async function GET() {
  try {
      console.log('ENVIRONEMENT value:', ENVIRONEMENT);

    if (ENVIRONEMENT === 'test') {
      console.log('→ Using dummy data (NODE_ENV = test)');
      await new Promise(resolve => setTimeout(resolve, 150));
      return NextResponse.json(dummyProjects);
    }

    console.log('→ Fetching from GitHub API (ENV =', ENVIRONEMENT, ')');
    const projects = await getStarredProjects();
    return NextResponse.json(projects);

  } catch (err) {
    console.error('Error fetching projects:', err);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
