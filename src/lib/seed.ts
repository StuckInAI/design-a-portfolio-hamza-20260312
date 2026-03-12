import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Project } from '../entities/Project';
import { Skill } from '../entities/Skill';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : path.resolve(process.cwd(), 'portfolio.sqlite');

async function seed() {
  const dataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    synchronize: true,
    logging: false,
    entities: [Project, Skill],
  });

  await dataSource.initialize();
  console.log('Database connected for seeding...');

  const projectRepo = dataSource.getRepository(Project);
  const skillRepo = dataSource.getRepository(Skill);

  const existingProjects = await projectRepo.count();
  if (existingProjects === 0) {
    const projects = projectRepo.create([
      {
        title: 'E-Commerce Platform',
        description:
          'A full-featured e-commerce platform with product management, shopping cart, payment integration, and order tracking. Built with a microservices architecture for scalability.',
        imageUrl: null,
        techStack: 'Next.js,TypeScript,Node.js,PostgreSQL,Stripe,Docker',
        liveUrl: 'https://example.com/ecommerce',
        githubUrl: 'https://github.com/example/ecommerce',
        featured: true,
      },
      {
        title: 'Real-Time Chat Application',
        description:
          'A scalable real-time messaging application supporting direct messages, group chats, file sharing, and presence indicators. Uses WebSockets for instant message delivery.',
        imageUrl: null,
        techStack: 'React,Socket.io,Express,MongoDB,Redis,JWT',
        liveUrl: 'https://example.com/chat',
        githubUrl: 'https://github.com/example/chat',
        featured: true,
      },
      {
        title: 'AI Task Manager',
        description:
          'An intelligent task management tool that uses AI to prioritize tasks, suggest deadlines, and provide productivity insights. Integrates with popular calendar apps.',
        imageUrl: null,
        techStack: 'React,Python,FastAPI,OpenAI,PostgreSQL,Tailwind CSS',
        liveUrl: 'https://example.com/taskmanager',
        githubUrl: 'https://github.com/example/taskmanager',
        featured: true,
      },
      {
        title: 'DevOps Dashboard',
        description:
          'A comprehensive monitoring and deployment dashboard for managing Kubernetes clusters, viewing logs, tracking deployments, and setting up alerts.',
        imageUrl: null,
        techStack: 'Vue.js,Go,Kubernetes,Prometheus,Grafana,Docker',
        liveUrl: null,
        githubUrl: 'https://github.com/example/devops-dashboard',
        featured: false,
      },
      {
        title: 'Portfolio Website',
        description:
          'This very portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a modern design, dark mode, and smooth animations.',
        imageUrl: null,
        techStack: 'Next.js,TypeScript,Tailwind CSS,SQLite,TypeORM',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example/portfolio',
        featured: false,
      },
      {
        title: 'Weather Analytics App',
        description:
          'A weather analytics application that provides historical weather data, forecasts, and climate trend analysis using multiple weather APIs and data visualization.',
        imageUrl: null,
        techStack: 'React,D3.js,Node.js,PostgreSQL,WeatherAPI',
        liveUrl: 'https://example.com/weather',
        githubUrl: 'https://github.com/example/weather',
        featured: false,
      },
    ]);
    await projectRepo.save(projects);
    console.log(`Seeded ${projects.length} projects.`);
  } else {
    console.log('Projects already seeded, skipping...');
  }

  const existingSkills = await skillRepo.count();
  if (existingSkills === 0) {
    const skills = skillRepo.create([
      { name: 'React', category: 'Frontend', proficiency: 92 },
      { name: 'Next.js', category: 'Frontend', proficiency: 90 },
      { name: 'TypeScript', category: 'Frontend', proficiency: 88 },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 95 },
      { name: 'Vue.js', category: 'Frontend', proficiency: 75 },
      { name: 'Node.js', category: 'Backend', proficiency: 87 },
      { name: 'Python', category: 'Backend', proficiency: 82 },
      { name: 'PostgreSQL', category: 'Backend', proficiency: 80 },
      { name: 'MongoDB', category: 'Backend', proficiency: 78 },
      { name: 'GraphQL', category: 'Backend', proficiency: 72 },
      { name: 'Docker', category: 'DevOps', proficiency: 85 },
      { name: 'Kubernetes', category: 'DevOps', proficiency: 70 },
      { name: 'CI/CD', category: 'DevOps', proficiency: 80 },
      { name: 'AWS', category: 'DevOps', proficiency: 75 },
      { name: 'Git', category: 'Tools', proficiency: 93 },
      { name: 'VS Code', category: 'Tools', proficiency: 95 },
      { name: 'Figma', category: 'Tools', proficiency: 68 },
      { name: 'Postman', category: 'Tools', proficiency: 88 },
    ]);
    await skillRepo.save(skills);
    console.log(`Seeded ${skills.length} skills.`);
  } else {
    console.log('Skills already seeded, skipping...');
  }

  await dataSource.destroy();
  console.log('Seeding complete!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
