# RedditMock (OpenForum Style Feed)

A full-stack MERN practice project with:

- Express + Mongoose backend
- React + Vite frontend
- Seed script for sample users/posts
- Vitest tests for controller behavior

## Tech Stack

- Backend: Node.js, Express, Mongoose, MongoDB
- Frontend: React, React Router, Axios, Vite
- Testing: Vitest, mongodb-memory-server, supertest

## Project Structure

```
RedditMock/
	backend/
		server.js
		src/
			config/db.js
			controller/postController.js
			models/Post.js
			models/User.js
			routes/postRoutes.js
			seed/seed.js
	frontend/
		src/
			pages/Home.jsx
			components/PostList.jsx
			components/PostCard.jsx
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection URI

## Environment Variables

Create backend/.env with:

```
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
```

## Installation

From the RedditMock folder:

```
cd backend
npm install

cd ../frontend
npm install
```

## Running the App

Run backend:

```
cd backend
npm run dev
```

Run frontend in another terminal:

```
cd frontend
npm run dev
```

Frontend default URL: http://localhost:5173

Backend default URL: http://localhost:5000

## Seed Data

Populate MongoDB with sample users and posts:

```
cd backend
npm run seed
```

## Testing

Run backend tests:

```
cd backend
npm test
```

Run one specific test file:

```
npx vitest src/controller/__tests__/postController.test.js --run
```

## API Reference

Base URL:

```
http://localhost:5000
```

### GET /api/posts

Fetch all posts sorted by createdAt in descending order (newest first).

- Method: GET
- Path: /api/posts
- Auth required: No

Success response:

- Status: 200 OK
- Body: array of post objects

Example response:

```json
[
  {
    "_id": "67f0c31f4e3d4ef7100d4d21",
    "title": "Best VS Code Extensions for 2026",
    "body": "Here are my top 10 VS Code extensions...",
    "author": {
      "_id": "67f0c2fb4e3d4ef7100d4d1f",
      "username": "u/bob_wilson",
      "email": "bob@example.com"
    },
    "tags": ["vscode", "productivity", "tools"],
    "upvotes": 42,
    "createdAt": "2026-02-02T00:00:00.000Z",
    "__v": 0
  }
]
```

Error response:

- Status: 500 Internal Server Error

```json
{
  "message": "Failed to fetch posts",
  "error": "<error_message>"
}
```

### Data Notes

- The author field is populated from User using a field projection:
  - included fields: username, email
  - excluded by design: other user fields not required by feed rendering

## Current Feature Scope

Implemented:

- Read forum posts from MongoDB
- Populate post author details
- Show posts in a frontend feed
- Controller tests with mocked and non-mocked data flows

Not implemented yet:

- Create/update/delete post endpoints
- Authentication and authorization
- Voting API persistence
