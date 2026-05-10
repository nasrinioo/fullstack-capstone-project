# fullstack-capstone-project (GiftLink)

Full-stack capstone: **Node.js + Express**, **MongoDB**, **JWT auth**, **React (Vite)**, **Docker**, **GitHub Actions**.

## Repository name (grading)

Use GitHub repository name: **`fullstack-capstone-project`**.

## Quick start (local)

1. **MongoDB** on `localhost:27017` (or set `MONGODB_URI`).
2. **Backend**

   ```bash
   cd backend
   cp .env.example .env
   npm ci
   npm run seed
   npm start
   ```

   API default: [http://localhost:3060](http://localhost:3060)

3. **Frontend**

   ```bash
   cd frontend
   npm ci
   npm run dev
   ```

   App default: [http://localhost:3000](http://localhost:3000) (proxies `/api` → `3060`)

## Docker

```bash
docker compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:3060](http://localhost:3060)

## CI/CD

Workflow: [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) — **Build**, **Test** (with MongoDB service), **Deploy** (simulated).

## Assignment artifacts

- User stories: [`user-story.md`](user-story.md)
- Optional screenshots for submission: `userstories.png`, `deployed_landingpage.png` (add under repo root or your LMS)

## API overview

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/gifts` | List items |
| GET | `/api/gifts/:id` | Item detail |
| GET | `/api/search?category=` | Filter by category |
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login (JWT) |
| PUT | `/api/auth/user` | Update user (Bearer JWT) |
