
# Backend developed for adding and retrieving course details using MongoDB
# Backend (Node.js + Express + MongoDB)
    - RESTful API for:
        - `GET /courses` – retrieve all courses
        - `GET /courses/:id` – retrieve course details
        - `POST /courses` – add a new course
    - MongoDB schema for storing course data
    - Caching support using Redis
    - Structured error handling and scalability readiness

# Tech Stack
  Backend     - Node.js, Express.js          
  Database    - MongoDB + Mongoose
  Caching     - Redis

# Folder structure
component2/
    index.js         # Server
    .env             # Environment variables
    README.md
    package.json

# Installation

## 1. Clone the Repository

git clone https://github.com/Anjukailath-4tafensw/Component2.git
cd Component2

# Install Dependencies

## Component2:
cd Component2
npm install
npm install redis
node index.js

## 3. Environment Configuration

Create a `.env` file in `/Component2`:

MONGO_URI=mongodb://localhost:27017/Courses
PORT=3000

# API Endpoints

| Method | Route            | Description                  |
|--------|------------------|------------------------------|
| GET    | `/courses`       | Fetch all courses            |
| GET    | `/courses/:id`   | Fetch a course by ID         |
| POST   | `/courses`       | Add a new course             |
