# Qilin CRM

## Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- PostgreSQL (if running locally without Docker)

## Setup

1. **Clone Repository**
   ```bash
   git clone <repo-url>
   cd qilin-crm
   ```

2. **Environment Variables**
   - Check `backend/.env` and update `DATABASE_URL` and `GROQ_API_KEY`.

3. **Run with Docker (Recommended)**
   ```bash
   docker-compose up --build
   ```
   This will start Frontend (3000), Backend (5000), and Postgres (5432).

4. **Run Locally (Development)**
   - **Backend**:
     ```bash
     cd backend
     npm install
     npx prisma generate
     # Ensure local Postgres is running and DATABASE_URL is updated
     npx prisma migrate dev
     node index.js
     ```
   - **Frontend**:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```

## Project Structure
- `/frontend`: Next.js App
- `/backend`: Node.js/Express API
- `/database`: Database scripts

## Troubleshooting
- If `docker-compose` fails, ensure Docker Desktop is running.
- If `prisma migrate` fails, check database connection string.
