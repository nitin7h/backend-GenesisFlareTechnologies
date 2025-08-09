# Backend

This is a Node.js + TypeScript backend project that uses Express, Docker, Kafka, BullMQ, Redis, Mongoose, and other common libraries. It supports development with live reload and production build.

## 🚀 Features

- **Docker** for containerization and easy deployment.
- **BullMQ** for managing background jobs and notifications.
- **Redis** as the message broker for BullMQ.
- **Apache Kafka** for fault-tolerant, scalable pub/sub messaging to ensure reliable data delivery even during database downtime, running via Docker.
- **TypeScript** for strong typing and cleaner code.
- **Express** for server-side routing.
- **Mongoose** to interact with MongoDB.
- **Nodemailer** for sending emails.
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

## Run Redis with Docker

```bash
docker run -d --name redis -p 6379:6379 redis:latest
```

## Access Redis CLI inside the container

```bash
docker exec -it redis redis-cli
```

## Get the Apache Kafka Docker image

```bash
docker pull apache/kafka:4.0.0
```

## Start the Kafka Docker container

```bash
docker run -p 9092:9092 apache/kafka:4.0.0
```

## Run in Development Mode

```bash
npm run dev
```

## Run BullMQ Worker in backround

```bash
npm run start:worker
```
