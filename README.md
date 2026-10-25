# CareCircle (SoulSpeak)

CareCircle is a peer-support community web app where people can connect around mental wellness, share experiences, and find supportive conversations. The frontend currently displays the name **CareCircle**; the root Node package is named **soulspeak**.

> CareCircle is a peer-support platform, not a substitute for professional mental-health care or emergency services.

## Features

- Sign up with a profile tailored to a user's interests and support preferences; sign in and manage a profile.
- Browse support groups and create posts, including anonymous posts with a nickname and avatar.
- Search posts, upvote them, comment, and report content.
- Chat privately with other community members; messages are stored in MongoDB and delivered in real time with Socket.IO.
- Use companion-readiness and training quizzes, with learning-resource links in the training program.
- Admin dashboard pages for managing users, groups, and reports, and viewing community analytics.
- Show an advice slip on the home page using the Advice Slip API.

## Tech stack

- **Frontend:** React 18, Vite, React Router, Tailwind CSS
- **Backend:** Node.js, Express 4, Socket.IO
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT) and bcrypt password hashing

## Getting started

### Prerequisites

- Node.js 18 or newer and npm
- A MongoDB instance, local or hosted

### 1. Install dependencies

From the project root:

```bash
npm install
```

Then install the frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://127.0.0.1:27017/soulspeak
PORT=5000
```

Replace `MONGO_URI` with your MongoDB connection string. `PORT=5000` is intentional: the frontend currently sends API and Socket.IO requests to `http://localhost:5000`. The backend's fallback port is `5001`, so set `PORT=5000` for the current frontend configuration.

### 3. Start the backend

In a terminal at the project root:

```bash
npm run dev
```

The API and Socket.IO server will be available at `http://localhost:5000`.

### 4. Start the frontend

In another terminal:

```bash
cd frontend
npm run dev -- --port 5174
```

Open the local URL printed by Vite (normally `http://localhost:5174`). The backend CORS configuration currently allows this origin.

> **Local configuration note:** API URLs in the frontend and the backend's CORS origins are hardcoded for local development. For a different port or a production deployment, update those URLs and the backend CORS settings to match your frontend and API hosts.

## API overview

The Express router is mounted at the server root. The main endpoints are:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/signup` | Register an account |
| `POST` | `/login` | Sign in and receive a JWT |
| `GET`, `PUT` | `/profile` | Read or update the signed-in user's profile |
| `GET` | `/api/groups` | List community groups |
| `POST` | `/api/group` | Create a group |
| `PUT` | `/api/group` | Update a group |
| `DELETE` | `/api/group/:id` | Delete a group and its posts |
| `POST` | `/api/post` | Create a post |
| `POST` | `/api/getPosts` | Fetch posts, optionally filtered by group or search text |
| `POST` | `/api/post/upvote` | Upvote a post |
| `POST` | `/api/comment` | Add a comment |
| `POST` | `/api/getComments` | Fetch comments for a post |
| `POST` | `/api/report` | Report a post |
| `GET` | `/api/analytics` | Fetch community analytics |
| `POST` | `/sendmsg/:uid/:id` | Save a message and fetch the conversation |
| `GET` | `/getmessages/:uid/:id` | Fetch a conversation |

The router also provides user, report, comment, and message-management endpoints; see [`backend/routes/route.js`](./backend/routes/route.js) for the complete route list.

## Project structure

```text
.
├── backend/
│   ├── config/          # MongoDB connection and JWT middleware
│   ├── controllers/     # Authentication, community, chat, and admin APIs
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── index.js         # HTTP server and API setup
│   └── socket.js        # Socket.IO events
├── frontend/
│   └── src/
│       ├── components/  # Community, chat, and admin UI
│       ├── pages/       # App pages
│       └── Context/     # Authentication state
├── package.json         # Backend development scripts and dependencies
└── README.md
```

## Available scripts

From the project root:

```bash
npm run dev
```

From `frontend/`:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Privacy and configuration

- Keep `.env` private; never commit database credentials or other secrets.
- The app handles sensitive mental-wellness profile information. Use a secured database and HTTPS, and review access controls before deploying publicly.
- The home page requests advice from the third-party Advice Slip API.
