import { NextResponse } from 'next/server';
import { projects as dummyProjects } from './dummy';
import { getStarredProjects } from './projectsService';
import { ENVIRONEMENT } from '@/env'
import { logRouteError, withRequestLogging } from '@/src/lib/requestLog';

export const GET = withRequestLogging('projects', async () => {
  try {
    if (ENVIRONEMENT === 'test') {
      console.log('→ Using dummy data (NODE_ENV = test)');
      await new Promise(resolve => setTimeout(resolve, 150));
      return NextResponse.json(dummyProjects);
    }
    const projects = await getStarredProjects();
    return NextResponse.json(projects);

  } catch (err) {
    logRouteError('projects', err);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
});
