# K Notebook 📓

> *A secure, single-user journaling platform. Just a random thought, executed.*

**Live →** [k-notebook.vercel.app](https://k-notebook.vercel.app)

---

## What is K Notebook?

K Notebook is a minimal, personal journaling web app built for one user — me. No social features, no noise, no distractions. Just a clean space to write, reflect, and keep thoughts organized.

The idea started as a random thought. Then I built it. That's the whole story.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Spring Boot 3, Java 17 |
| Database | PostgreSQL |
| Auth | JWT (single-user, stateless) |
| Media | Cloudinary |
| Containerization | Docker |
| Frontend Hosting | Vercel |
| Backend Hosting | Railway |

---

## Features

- **Secure single-user auth** — JWT-based login, no registration flow needed
- **Create, edit, delete journal entries** — full CRUD with a clean writing experience
- **Image uploads** — attach images to entries via Cloudinary
- **Persistent storage** — all entries stored in PostgreSQL
- **Dockerized backend** — consistent dev and production environments
- **Deployed and live** — frontend on Vercel, backend on Railway

---

## Project Structure

```
K-Notebook/
├── frontend/          # Next.js 14 app (TypeScript)
│   ├── app/           # App router pages and layouts
│   ├── components/    # Reusable UI components
│   └── ...
├── backend/           # Spring Boot REST API (Java)
│   ├── src/
│   │   └── main/java/
│   │       └── ...    # Controllers, services, repositories
│   ├── Dockerfile
│   └── pom.xml
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- PostgreSQL
- Docker (optional, for backend)

### 1. Clone the repo

```bash
git clone https://github.com/krisharma955/K-Notebook.git
cd K-Notebook
```

### 2. Backend setup

```bash
cd backend
```

Create an `application.properties` or set environment variables:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/knotebook
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password

jwt.secret=your_jwt_secret
jwt.expiration=86400000

cloudinary.cloud-name=your_cloud_name
cloudinary.api-key=your_api_key
cloudinary.api-secret=your_api_secret
```

Run with Maven:

```bash
./mvnw spring-boot:run
```

Or with Docker:

```bash
docker build -t k-notebook-backend .
docker run -p 8080:8080 --env-file .env k-notebook-backend
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Run the dev server:

```bash
npm run dev
```

App runs at `http://localhost:3000`.

---

## Environment Variables

### Backend

| Variable | Description |
|---|---|
| `SPRING_DATASOURCE_URL` | PostgreSQL connection URL |
| `SPRING_DATASOURCE_USERNAME` | DB username |
| `SPRING_DATASOURCE_PASSWORD` | DB password |
| `JWT_SECRET` | Secret key for signing JWTs |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Frontend

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the Spring Boot backend |

---

## Deployment

- **Frontend** — deployed on [Vercel](https://vercel.com). Push to `main` auto-deploys.
- **Backend** — deployed on [Railway](https://railway.app) via Docker. Set env vars in the Railway dashboard.

---

## Why I Built This

I wanted a personal journaling space that was fully mine — no third-party apps storing my thoughts, no subscriptions, no bloat. So I built it. It's deployed, it works, and it's genuinely useful to me. That's enough of a reason.

---

## Author

**Krish Sharma**
[@krisharma955](https://github.com/krisharma955)

---

*Just a random thought, executed.*
