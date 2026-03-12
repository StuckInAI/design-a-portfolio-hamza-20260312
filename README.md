# Personal Portfolio Website

A modern, full-stack personal portfolio website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **SQLite**, and **TypeORM**.

## 🚀 Features

- **Responsive Design** — Works on mobile, tablet, and desktop
- **Dark/Light Mode** — Theme toggle with persistent preference
- **Smooth Animations** — Fade-in and slide-up animations throughout
- **Full-Stack** — Next.js App Router with API routes
- **SQLite Database** — Persistent storage via TypeORM
- **Contact Form** — Client-side validation + server-side storage
- **Projects Filtering** — Filter projects by tech stack
- **Skills Visualization** — Proficiency bars grouped by category
- **Docker Ready** — Multi-stage Dockerfile + docker-compose

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/             # Next.js App Router pages + API routes
│   ├── components/      # Reusable UI components
│   ├── entities/        # TypeORM entities (Project, Skill, Message)
│   └── lib/             # Database config + seed script
├── public/
├── Dockerfile
├── docker-compose.yml
└── ...
```

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (via better-sqlite3)
- **ORM**: TypeORM
- **Deployment**: Docker / docker-compose

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 20+
- npm

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm i
   ```

3. **Configure environment**
   ```bash
   cp .env .env.local
   # Edit .env.local if needed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Seed the database** (optional but recommended)
   ```bash
   npm run seed
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### Production with Docker

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

The app will be available at [http://localhost:3000](http://localhost:3000).
SQLite data is persisted in a Docker volume (`portfolio-data`).

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed database with sample data |

## 🗄 Database Entities

### Project
- `id`, `title`, `description`, `imageUrl`, `techStack`, `liveUrl`, `githubUrl`, `featured`, `createdAt`

### Skill
- `id`, `name`, `category`, `proficiency`

### Message
- `id`, `name`, `email`, `subject`, `body`, `read`, `createdAt`

## 🔌 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects?featured=true` | Get featured projects |
| GET | `/api/skills` | Get skills grouped by category |
| POST | `/api/messages` | Submit contact form |
| GET | `/api/messages` | Get all messages |

## 🌍 Environment Variables

```env
DATABASE_PATH=./portfolio.sqlite
NEXT_PUBLIC_SITE_TITLE=My Portfolio
NEXT_PUBLIC_SITE_DESCRIPTION=Personal portfolio and project showcase
```

## 📄 License

MIT License — feel free to use this as a template for your own portfolio!
