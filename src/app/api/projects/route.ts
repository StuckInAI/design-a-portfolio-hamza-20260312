import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Project } from '@/entities/Project';

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Project);
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    let projects: Project[];
    if (featured === 'true') {
      projects = await repo.find({
        where: { featured: true },
        order: { createdAt: 'DESC' },
      });
    } else {
      projects = await repo.find({ order: { createdAt: 'DESC' } });
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
