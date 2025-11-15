# PocketLLM Portal

A lightweight web application for LLM-powered conversational capabilities on resource-constrained, CPU-only hardware.

## Architecture

This project implements the Next.js-based architecture designed in CSCI 578 Assignment #3.

### Technology Stack

- **Frontend**: Next.js 14+ (React 18+, App Router)
- **Backend**: Python (FastAPI/Flask)
- **LLM**: TinyLlama-1.1B-Chat (4-bit quantized)
- **Inference Engine**: llama.cpp (CPU-optimized)
- **Deployment**: Docker

### Resource Constraints

- CPU-only (no GPU required)
- 2-4 vCPUs
- ≤8-16 GB RAM

## Project Structure

```
PocketLLM/
├── frontend/           # Next.js application
│   ├── app/           # Next.js App Router
│   │   ├── page.tsx   # Chat page (/)
│   │   ├── history/   # History page
│   │   ├── admin/     # Admin dashboard
│   │   ├── login/     # Login page
│   │   └── api/       # API routes (BFF layer)
│   ├── components/    # React components
│   ├── contexts/      # React Context API
│   ├── hooks/         # Custom hooks
│   └── lib/           # Utilities
├── backend/           # Python backend services
│   ├── api_gateway/   # API Gateway
│   ├── auth/          # Authentication service
│   ├── inference/     # Model inference service
│   ├── cache/         # Cache manager
│   └── monitoring/    # Monitoring & telemetry
├── models/            # LLM models (TinyLlama)
├── docker/            # Docker configurations
└── docs/              # Documentation

```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- Python >= 3.10
- Docker and Docker Compose

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PocketLLM
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### Development

Run the development servers:

```bash
# Terminal 1: Frontend (Next.js)
cd frontend
npm run dev

# Terminal 2: Backend
cd backend
python main.py
```

### Docker Deployment

Build and run with Docker:

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`

## Features

### Core Features (MVP)
- ✅ User Authentication
- ✅ Chat Interface
- ✅ LLM Inference (TinyLlama)
- ✅ Response Caching (LRU)
- ✅ Conversation History

### Optional Features
- ⭕ Admin Dashboard
- ⭕ WebSocket Real-time Communication
- ⭕ System Monitoring Metrics

## Architecture Highlights

- **Backend-for-Frontend (BFF)**: Next.js API Routes act as a proxy layer
- **Server-Side Rendering (SSR)**: Fast initial page loads
- **Context API**: Lightweight global state management
- **CPU Optimization**: llama.cpp for efficient CPU-only inference

## Team Members

- [Add team member names here]

## License

USC CSCI 578 - Fall 2025 - Team Project
