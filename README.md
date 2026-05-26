# Road SOS Backend

Production-style backend for the Road SOS emergency response system.

## Features
- **Offline-First**: SOS delivery fallback to Redis queue.
- **Relay System**: Background worker retries failed SMS deliveries.
- **AI Triage**: Heuristic-based crash severity calculation.
- **Real-time Tracking**: Live location broadcasting via Socket.IO.
- **Production Ready**: Prisma ORM, JWT Authentication, and Dockerized.

## Tech Stack
- **API**: Node.js + Express
- **Database**: PostgreSQL (Prisma)
- **Queue**: Redis
- **Real-time**: Socket.IO
- **SMS**: Twilio
- **Auth**: JWT

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`.

3. Initialize Database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run Development Server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/sos/send` - Trigger SOS
- `GET /api/sos/history/:userId` - View SOS history
- `POST /api/crash/analyze` - Standalone AI crash analysis
- `GET /api/hospitals/nearby` - Find nearby medical facilities (Mock)
- `POST /api/voice/trigger` - SOS via voice transcript
- `POST /api/mesh/broadcast` - BLE Mesh packet relay

## Docker
Build and run with:
```bash
docker build -t road-sos-backend .
docker run -p 5000:5000 road-sos-backend
```
