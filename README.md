# TODO Demo V3

Simple task management demo application.

## Tech Stack

- **Backend:** NestJS 10 + PostgreSQL + TypeORM
- **Frontend:** Next.js 14 + React + Tailwind CSS
- **Infrastructure:** Railway (API) + Vercel (Frontend)

## Structure

```
apps/
├── api/      # NestJS backend
└── web/      # Next.js frontend
```

## Development

```bash
# Install dependencies
npm install

# Run API (requires DATABASE_URL)
cd apps/api && npm run start:dev

# Run Web (requires NEXT_PUBLIC_API_URL)
cd apps/web && npm run dev
```

## Deployment

- API auto-deploys to Railway on push
- Frontend deploys to Vercel
