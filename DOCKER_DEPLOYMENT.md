# PocketLLM Portal - Docker Deployment Guide

## Overview

This guide provides instructions for deploying the PocketLLM Portal using Docker and Docker Compose. The application consists of three containerized services:

- **Frontend**: Next.js application (port 3000)
- **Backend**: FastAPI + LLM inference engine (port 8000)
- **Redis**: Caching layer (port 6379)

## Prerequisites

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **System Resources**:
  - Required: 4 vCPUs, 16GB RAM (as per project requirements)
- **Model File**: `tinyllama-1.1b-chat-q4.gguf` (638MB) - **Already included in Docker image**

## Quick Start

### 1. Clone and Prepare

```bash
cd /path/to/PocketLLM
```

### 2. Build and Start Services

```bash
# Build all images
docker-compose build

# Start all services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### 4. Default Credentials

- **Admin User**:
  - Username: `admin`
  - Password: `admin123`

- **Regular User**:
  - Username: `user`
  - Password: `user123`

## Resource Allocation

The docker-compose configuration allocates resources as follows:

| Service  | CPU Limit | Memory Limit | CPU Reserved | Memory Reserved |
|----------|-----------|--------------|--------------|-----------------|
| Backend  | 2.5 cores | 14 GB        | 1.5 cores    | 4 GB            |
| Frontend | 1 core    | 1.5 GB       | 0.5 cores    | 512 MB          |
| Redis    | 0.5 cores | 512 MB       | 0.25 cores   | 256 MB          |
| **Total**| **4.0**   | **16 GB**    | **2.25**     | **4.75 GB**     |

**Note**: The total resource limits exactly match the project requirement of **4 vCPUs and 16 GB RAM**.

## Docker Commands

### Service Management

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart a specific service
docker-compose restart backend

# View service status
docker-compose ps

# View logs for a specific service
docker-compose logs -f backend
```

### Building and Rebuilding

```bash
# Build all images
docker-compose build

# Rebuild a specific service
docker-compose build backend

# Build with no cache (clean build)
docker-compose build --no-cache
```

### Cleanup

```bash
# Stop and remove containers
docker-compose down

# Stop and remove containers, volumes, and networks
docker-compose down -v

# Remove unused Docker images
docker image prune -a
```

## Health Checks

All services include health checks:

- **Backend**: HTTP GET to `/health` endpoint
- **Frontend**: HTTP GET to `/api/health` endpoint
- **Redis**: Automatic Docker health check

Check service health:

```bash
docker-compose ps
```

Healthy services will show `(healthy)` in the status.

## Troubleshooting

### Services Won't Start

1. Check Docker daemon is running:
   ```bash
   docker info
   ```

2. Check available system resources:
   ```bash
   docker system df
   free -h
   ```

3. Review service logs:
   ```bash
   docker-compose logs backend
   docker-compose logs frontend
   ```

### Out of Memory Errors

If the backend crashes with OOM (Out of Memory) errors:

1. Reduce batch size or model context in backend configuration
2. Ensure Docker has access to sufficient RAM
3. Check Docker Desktop resource settings (on Mac/Windows)

### Model File Issues

The model file is embedded in the Docker image. Verify it's present:

```bash
# Check if model file exists in container
docker-compose exec backend ls -lh /app/models/

# Expected output: 638M tinyllama-1.1b-chat-q4.gguf
```

### Port Conflicts

If ports 3000 or 8000 are already in use:

1. Edit `docker-compose.yml` to change port mappings:
   ```yaml
   ports:
     - "3001:3000"  # Map to different host port
   ```

2. Restart services:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### Database Issues

If you need to reset the database:

```bash
# Stop services
docker-compose down

# Remove backend data volume
docker volume rm pocketllm_backend-data

# Restart services
docker-compose up -d
```

## Architecture Details

### Network Configuration

All services communicate through a dedicated Docker bridge network (`pocketllm`):

- Services can reference each other by service name (e.g., `backend:8000`)
- Redis is accessible at `redis://redis:6379`
- Frontend connects to backend at `http://backend:8000`

### Volume Mounts

- **Model File**: Embedded in Docker image
  - TinyLlama model (638MB) is copied into the backend image during build
  - Located at `/app/models/tinyllama-1.1b-chat-q4.gguf` inside container
  - No external mount required - fully self-contained

- **Backend Data**: Named volume `backend-data`
  - Persists SQLite database and user data at `/app/data`
  - Survives container restarts and rebuilds

### Multi-Stage Builds

Both Dockerfiles use multi-stage builds for optimization:

- **Builder stage**: Compiles dependencies and builds application
- **Runner stage**: Minimal production image with only runtime dependencies
- Benefits: Smaller image size, faster deployment, improved security

## Production Considerations

### Environment Variables

For production deployment, create a `.env` file:

```env
# Backend
PYTHON_ENV=production
MODEL_PATH=/app/models/tinyllama-1.1b-chat-q4.gguf
REDIS_HOST=redis
REDIS_PORT=6379
DATABASE_URL=sqlite:///./data/pocketllm.db
SECRET_KEY=<your-secret-key-change-in-production>

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NODE_ENV=production
```

### Security

1. Change default admin password immediately
2. Use strong JWT secrets
3. Enable HTTPS in production (use nginx reverse proxy)
4. Implement rate limiting
5. Regular security updates for base images

### Monitoring

Monitor Docker container metrics:

```bash
# Real-time stats
docker stats

# Specific service stats
docker stats pocketllm-backend-1
```

### Scaling

To scale services (requires Docker Swarm or Kubernetes):

```bash
# Scale frontend to 3 replicas
docker-compose up -d --scale frontend=3
```

## Testing the Deployment

### 1. Health Check

```bash
# Check backend health
curl http://localhost:8000/health

# Check frontend
curl http://localhost:3000/
```

### 2. Authentication Test

```bash
# Login as admin
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 3. LLM Inference Test

```bash
# Get auth token first, then test chat endpoint
curl -X POST http://localhost:8000/chat \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, how are you?","conversation_id":"test-123"}'
```

## Support

For issues or questions:

1. Check service logs: `docker-compose logs -f`
2. Review this deployment guide
3. Consult the main README.md for application details
4. Check Docker documentation: https://docs.docker.com/

## Summary

This Docker deployment provides:

- ✅ Containerized layered architecture (Frontend, Application, Data layers)
- ✅ Resource limits compliant with project requirements (≤4 vCPUs, ≤16GB RAM)
- ✅ Health checks and automatic restart policies
- ✅ Data persistence with Docker volumes
- ✅ Isolated network for service communication
- ✅ Production-ready multi-stage builds
- ✅ Easy deployment with single command: `docker-compose up -d`

**Note**: This is not a microservices architecture - containers represent layers of our layered architecture.
