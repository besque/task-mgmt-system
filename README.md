# Task Management System

A full-stack web application for managing tasks, built with React, Redux, and Node.js.

## Technologies Used

- **Frontend**:
  - React for building the UI components
  - Redux for state management
  - React Router for navigation between views
  - Bootstrap for responsive design
  - JavaScript & jQuery for dynamic interactions

- **Backend**:
  - Node.js with Express framework
  - MongoDB for database
  - Mongoose ODM for data modeling

## Features

- View all tasks in a responsive dashboard
- Add new tasks with title, description, and status
- View task details and update task information
- Delete tasks
- Smooth animations and interactive UI using jQuery

## Project Structure

```
task-manager-app/
├── client/               # React frontend
│   ├── public/           # Static files
│   └── src/              # React source code
│       ├── components/   # React components
│       └── redux/        # Redux state management
└── server/               # Node.js backend
    ├── models/           # Mongoose models
    └── routes/           # API routes
```

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed or MongoDB Atlas account
- Git (optional)

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with:
   ```
   MONGO_URI=mongodb://localhost:27017/taskmanager
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React application:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Deployment

The application is deployed using the following:
- Frontend: [Netlify](https://www.netlify.com/)
- Backend: [Heroku](https://www.heroku.com/)
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Live Demo: [https://task-manager-app-demo.netlify.app](https://task-manager-app-demo.netlify.app)


## Development Process

This application was built as part of the FSUI coursework, focusing on:
- Creating responsive UI with HTML5, CSS3, and Bootstrap
- Implementing dynamic interactions with JavaScript and jQuery
- Building reusable components with React
- Managing application state with Redux
- Implementing CRUD operations with MongoDB and Express
