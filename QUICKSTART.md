# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Prerequisites
- Docker and Docker Compose installed
- Git (to clone the repository)

### 2. Run the Application
```bash
# Clone the repository (if not already done)
git clone <your-repo-url>
cd todo-list-app

# Start all services with Docker Compose
docker-compose up --build
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend GraphQL**: http://localhost:5000/graphql
- **Database**: localhost:5432 (PostgreSQL)

## 🧪 Test the Setup

Run the test script to verify everything is working:
```powershell
.\test-docker.ps1
```

## 📱 Using the Application

1. **Add a Task**: Enter a title and optional description, then click "Add Task"
2. **Toggle Status**: Click the checkmark icon to mark tasks as completed/pending
3. **Delete Task**: Click the delete icon to remove a task
4. **View Tasks**: All tasks are displayed with their current status

## 🔧 GraphQL Testing

You can test the GraphQL API directly using the GraphQL playground at http://localhost:5000/graphql

### Example Queries

**Get All Tasks:**
```graphql
query {
  getAllTasks {
    id
    title
    description
    status
    createdAt
  }
}
```

**Create a Task:**
```graphql
mutation {
  createTask(input: {
    title: "Test Task"
    description: "This is a test task"
  }) {
    id
    title
    status
  }
}
```

**Update Task Status:**
```graphql
mutation {
  updateTaskStatus(input: {
    id: 1
    status: COMPLETED
  }) {
    id
    status
  }
}
```

## 🐳 Docker Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Rebuild and start
docker-compose up --build
```

## 🆘 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Stop other services using ports 3000, 5000, or 5432
   - Or modify the ports in `docker-compose.yml`

2. **Database Connection Issues**
   - Wait a few minutes for PostgreSQL to fully start
   - Check logs: `docker-compose logs database`

3. **Frontend Not Loading**
   - Check if backend is running: `docker-compose logs backend`
   - Verify nginx configuration

4. **Build Failures**
   - Clean Docker cache: `docker system prune -a`
   - Rebuild: `docker-compose up --build --force-recreate`

## 📊 Project Structure

```
├── backend/          # ASP.NET Core GraphQL API
├── frontend/         # React TypeScript App
├── docker-compose.yml # Orchestration
└── README.md         # Full documentation
```

## 🎯 Features Implemented

✅ **Backend (ASP.NET Core + GraphQL)**
- GraphQL schema for tasks (id, title, description, status)
- Mutations: createTask, updateTaskStatus, deleteTask
- Query: getAllTasks, getTaskById
- Entity Framework Core with PostgreSQL
- CORS configuration

✅ **Frontend (React + Adobe React Spectrum)**
- Modern UI with Adobe React Spectrum components
- GraphQL client for data fetching
- Task management (add, toggle status, delete)
- TypeScript for type safety
- Responsive design

✅ **Docker & Deployment**
- Backend containerized with .NET 9.0
- Frontend containerized with nginx
- PostgreSQL database container
- Docker Compose orchestration
- Production-ready configuration

## 🚀 Next Steps

1. **Test the application** using the URLs above
2. **Explore the code** in the `backend/` and `frontend/` directories
3. **Modify the GraphQL schema** if needed
4. **Customize the UI** with additional React Spectrum components
5. **Add authentication** for multi-user support
6. **Deploy to cloud** (AWS, Azure, Google Cloud)

---

**Development Time**: ~1 hour with AI assistance
**Technologies**: 8+ modern technologies integrated
**Ready for Production**: Yes, with proper environment configuration
