# BookkeeperBot Simulator

A full-stack application for simulating and managing bookkeeping task automation bots.

## Features

- Create bots with custom names
- Automatic task assignment (2 tasks per bot)
- Real-time task progress tracking
- Task completion detection based on duration
- Bot and task management interfaces
- Dashboard with statistics and monitoring
- MongoDB persistence for all data
- WebSocket real-time updates

## Technology Stack

### Frontend

- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Socket.io client for real-time updates
- Axios for API requests

### Backend

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Socket.io for WebSocket communication
- RESTful API design

## Project Structure

The project follows a modern, well-organized structure:

- `client/` - React frontend application
- `server/` - Express backend application
- Docker configuration for containerized deployment

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/bookkeeper-bot.git
cd bookkeeper-bot
```

2. Install dependencies:

```
npm run install:all
```

### Running the Application

#### Development Mode

1. Start both frontend and backend:

```
npm run dev
```

This will start:

- Frontend at http://localhost:3000
- Backend at http://localhost:5000

#### Production Build

1. Build both applications:

```
npm run build
```

2. Start the production server:

```
npm start
```

### Using Docker

1. Build and run with Docker Compose:

```
docker-compose up --build
```

This will start:

- Frontend at http://localhost:3000
- Backend at http://localhost:5000
- MongoDB at localhost:27017

## API Endpoints

### Bots

- `GET /api/bots` - Get all bots
- `GET /api/bots/:id` - Get a specific bot
- `POST /api/bots` - Create a new bot
- `GET /api/bots/:id/tasks` - Get tasks for a specific bot
- `DELETE /api/bots/:id` - Delete a bot

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/available` - Get available tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task

## WebSocket Events

- `bot:created` - Emitted when a new bot is created
- `task:completed` - Emitted when a task is completed
- `task:progress` - Emitted to update task progress

## Implementation Details

### Bot Task Assignment

When a bot is created, it is automatically assigned 2 random tasks from the available pool. Tasks are marked as in-progress and their timers begin.

### Task Completion

Tasks are automatically completed after their specified duration has elapsed. The server continuously checks for tasks that should be completed based on their start time and duration.

### Real-time Updates

The application uses WebSockets to provide real-time updates for:

- Bot creation
- Task progress
- Task completion

This ensures that all clients see the latest state without needing to refresh.

## License

MIT
