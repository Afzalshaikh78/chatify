# Chatify

Chatify is a full-stack, real-time chat application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It provides a modern, responsive chat experience with features like authentication, messaging, and file sharing.

Live_url : https://chatify-d11bi.sevalla.app

---

## Features

- **Real-time messaging** (private 1-to-1 chat)
- **User authentication** (JWT, secure cookies)
- **Modern UI** with React + Tailwind CSS
- **Image/file upload** via Cloudinary
- **Responsive design** for desktop and mobile
- **Email notifications** (SMTP/NodeMailer/Brevo)
- **Production-ready security** (CORS, rate-limiting, bot detection with Arcjet)
- **Environment configuration** via `.env`

---

## Tech Stack

### Frontend
- **React** (with Vite for fast development)
- **Tailwind CSS** (with DaisyUI for components)
- **React Router** (SPA navigation)
- **react-hot-toast** (notifications)

### Backend
- **Node.js & Express.js** (REST API)
- **MongoDB** (Mongoose ODM)
- **JWT** (for authentication)
- **Socket.io** (real-time messaging)
- **Cloudinary** (media storage)
- **Arcjet** (security, bot and rate limiting)
- **Nodemailer/Brevo** (email service)
- **dotenv** (environment variable management)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance
- Cloudinary account (for image uploads)
- SMTP credentials (for email notifications)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/Afzalshaikh78/chatify.git
cd chatify
```

#### 2. Setup environment variables

- Copy `.env.example` to `.env` in both `/backend` and `/frontend` if present.
- Fill in your secrets (MongoDB URI, JWT secret, Cloudinary, SMTP, etc).

#### 3. Install dependencies

##### Backend:
```bash
cd backend
npm install
```

##### Frontend:
```bash
cd ../frontend
npm install
```

#### 4. Run the application

##### Backend (in `/backend`):
```bash
npm run dev
```

##### Frontend (in `/frontend`):
```bash
npm run dev
```
The backend runs on [http://localhost:3000](http://localhost:3000) and the frontend on [http://localhost:5173](http://localhost:5173) (default ports).

---

## Project Structure

```
chatify/
  backend/    # Express.js API, Socket.io, MongoDB models, config
  frontend/   # React app (Vite), Tailwind CSS, UI components
```

---

## Deployment

- The backend is ready for deployment to services like **Render**, **Heroku**, or **Vercel Functions**.
- The frontend can be deployed to **Vercel**, **Netlify**, or any static hosting.

---

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

---

## License

MIT

---

## Author

- [Afzalshaikh78](https://github.com/Afzalshaikh78)
