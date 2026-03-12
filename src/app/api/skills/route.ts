import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Skill } from '@/entities/Skill';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Skill);
    const skills = await repo.find({ order: { category: 'ASC', proficiency: 'DESC' } });

    const grouped: Record<string, Skill[]> = {};
    for (const skill of skills) {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    }

    return NextResponse.json(grouped);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}
