#!/bin/bash

# PocketLLM Portal - Docker Deployment Script
# This script helps deploy the PocketLLM Portal using Docker Compose

set -e  # Exit on error

echo "======================================"
echo "PocketLLM Portal - Docker Deployment"
echo "======================================"
echo ""

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed${NC}"
    echo "Please install Docker from https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: Docker Compose is not installed${NC}"
    echo "Please install Docker Compose from https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if model file exists
MODEL_FILE="./models/tinyllama-1.1b-chat-q4.gguf"
if [ ! -f "$MODEL_FILE" ]; then
    echo -e "${YELLOW}Warning: Model file not found at $MODEL_FILE${NC}"
    echo "Please ensure the TinyLlama model is downloaded before proceeding."
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Parse command line arguments
COMMAND=${1:-"up"}

case $COMMAND in
    "build")
        echo -e "${GREEN}Building Docker images...${NC}"
        docker-compose build --no-cache
        ;;

    "up"|"start")
        echo -e "${GREEN}Starting PocketLLM Portal...${NC}"
        docker-compose up -d

        echo ""
        echo "Waiting for services to be healthy..."
        sleep 10

        # Check service status
        docker-compose ps

        echo ""
        echo -e "${GREEN}✓ PocketLLM Portal is starting!${NC}"
        echo ""
        echo "Access the application at:"
        echo "  Frontend:  http://localhost:3000"
        echo "  Backend:   http://localhost:8000"
        echo "  API Docs:  http://localhost:8000/docs"
        echo ""
        echo "Default credentials:"
        echo "  Admin - username: admin, password: admin123"
        echo "  User  - username: user, password: user123"
        echo ""
        echo "View logs with: docker-compose logs -f"
        ;;

    "down"|"stop")
        echo -e "${YELLOW}Stopping PocketLLM Portal...${NC}"
        docker-compose down
        echo -e "${GREEN}✓ Services stopped${NC}"
        ;;

    "restart")
        echo -e "${YELLOW}Restarting PocketLLM Portal...${NC}"
        docker-compose restart
        echo -e "${GREEN}✓ Services restarted${NC}"
        ;;

    "logs")
        docker-compose logs -f
        ;;

    "clean")
        echo -e "${RED}This will remove all containers, volumes, and images.${NC}"
        read -p "Are you sure? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker-compose down -v
            docker image prune -a -f
            echo -e "${GREEN}✓ Cleanup complete${NC}"
        fi
        ;;

    "status")
        docker-compose ps
        ;;

    *)
        echo "Usage: $0 {build|up|down|restart|logs|clean|status}"
        echo ""
        echo "Commands:"
        echo "  build   - Build Docker images from scratch"
        echo "  up      - Start all services (default)"
        echo "  down    - Stop all services"
        echo "  restart - Restart all services"
        echo "  logs    - View service logs"
        echo "  clean   - Remove all containers and volumes"
        echo "  status  - Show service status"
        exit 1
        ;;
esac
