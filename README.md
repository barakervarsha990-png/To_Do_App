# ✅ TaskFlow — Full Stack Todo App

A professional, feature-rich Todo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with JWT Authentication, dark mode, and a beautiful modern UI.

![TaskFlow](https://img.shields.io/badge/Stack-MERN-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens)

---

## 🌟 Features

### 🔐 Authentication
- User Registration with validation
- User Login with JWT tokens
- Password hashing using bcrypt
- Protected routes — each user sees only their own tasks

### 📋 Task Management (Full CRUD)
- ➕ Add new tasks
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- ✅ Mark tasks as Completed
- ⏳ Mark tasks as Pending
- 🔄 Toggle task status with one click

### 🎯 Task Fields
- **Title** — Task name
- **Description** — Detailed notes
- **Priority** — Low / Medium / High
- **Due Date** — Deadline picker
- **Category** — Custom categories (Work, Personal, etc.)
- **Status** — Pending / Completed

### 🔍 Search & Filter
- 🔍 Real-time search by title or description
- 📊 Filter by Status (Pending / Completed)
- 🎯 Filter by Priority (Low / Medium / High)
- 📅 Sort by Date, Priority, or Title

### 🎨 UI/UX
- 🌙 Dark mode / Light mode toggle
- 📱 Fully responsive design
- 🎴 Beautiful task cards with animations
- 📊 Stats dashboard (Total, Pending, Completed, Progress %)
- 🔔 Toast notifications for all actions
- ⏳ Loading spinners
- 🗂️ Sidebar navigation
- 🧭 Top navbar

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React.js | 18 | UI Framework |
| Vite | 5 | Build Tool |
| React Router | 6 | Client-side Routing |
| Axios | 1.6 | HTTP Requests |
| React Hot Toast | 2.4 | Notifications |
| CSS3 | — | Styling & Animations |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime |
| Express.js | 4.18 | Web Framework |
| MongoDB | 7.0 | Database |
| Mongoose | 8.0 | ODM |
| JWT | 9.0 | Authentication |
| bcryptjs | 2.4 | Password Hashing |
| express-validator | 7.0 | Input Validation |
| dotenv | 16 | Environment Variables |
| cors | 2.8 | Cross-Origin Requests |
| nodemon | 3.0 | Dev Auto-restart |

---

## 📁 Project Structure

### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org) v18 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) v7.0
- [Git](https://git-scm.com)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/barakervarsha990-png/To_Do_App.git
cd To_Do_App
```

#### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

You should see:

---

## 👨‍💻 Development

### Start Development Servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

### Git Workflow
```bash
git add .
git commit -m "feat: your feature description"
git push
```

---

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "express-validator": "^7.0.1",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "nodemon": "^3.0.2"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.1",
  "axios": "^1.6.2",
  "react-hot-toast": "^2.4.1",
  "vite": "^5.0.10"
}
```

---

## 🛡️ Security Features

- ✅ Passwords hashed with **bcrypt** (12 salt rounds)
- ✅ **JWT tokens** expire after 7 days
- ✅ All task routes require authentication
- ✅ Users can only access **their own tasks**
- ✅ Input validation on all endpoints
- ✅ `.env` file excluded from Git
- ✅ CORS configured for specific origins

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'feat: Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Varsha Baraker**
- GitHub: [@barakervarsha990-png](https://github.com/barakervarsha990-png)

---

## ⭐ Show Your Support

If this project helped you, please give it a **⭐ star** on GitHub!

---

*Built with ❤️ using the MERN Stack*
