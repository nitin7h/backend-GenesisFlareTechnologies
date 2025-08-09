# Backend

This is a Node.js + TypeScript backend project that uses Express, Mongoose, and other common libraries. It supports development with live reload and production build.

## 🚀 Features

- **TypeScript** for strong typing and cleaner code.
- **Express** for server-side routing.
- **Mongoose** to interact with MongoDB.
- **Nodemailer** for sending emails.
- **BullMQ** for managing background jobs and notifications.
- **Redis** (Docker) as the message broker for BullMQ.
- **dotenv** for environment configuration.
- **CORS** support.
- **tsc-watch** for development workflow.

---

## 🛠️ Installation

```bash
npm install
```

Copy `.env.example` to `.env` and update the variables.

```sh
cp .env.example .env
```

## Running Redis with Docker

```bash
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis:latest
```

## Access Redis CLI inside the container

```bash
docker exec -it redis redis-cli
```

## Run in Development Mode

```bash
npm run dev
```
