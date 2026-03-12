import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Project } from '@/entities/Project';
import { Skill } from '@/entities/Skill';
import { Message } from '@/entities/Message';
import path from 'path';

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : path.resolve(process.cwd(), 'portfolio.sqlite');

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    synchronize: true,
    logging: false,
    entities: [Project, Skill, Message],
  });

  await dataSource.initialize();
  return dataSource;
}
