# 📁 File Transfer Application

A modern and secure real-time file transfer application built with the **MERN stack** and **Socket.IO**. This project allows users to register, log in, and send/receive files in real-time with encryption, progress indicators, and a smooth user experience.

---

## 🚀 Features

- 🔐 **User Authentication** (Register/Login with JWT)
- 🔄 **Real-Time File Transfer** using Socket.IO
- 🔒 **File Encryption & Security**
- 📂 File Uploads with Progress Bar
- 🎯 Role-Based Access (Sender/Receiver)
- 📤 Upload & 📥 Download Support
- 🖥️ Responsive and modern frontend using React + Tailwind CSS
- 🧾 Express rate limiting & Helmet for enhanced security
- 🌐 Cross-Origin Request Support (CORS)

---

## 🛠️ Tech Stack

**Frontend**
- React
- Tailwind CSS
- Axios
- Socket.IO Client

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- Multer for file uploads
- Helmet, CORS, dotenv, express-rate-limit

---

## 🧪 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/jatin-k-agarwal/File-Transfer-Application.git
cd File-Transfer-Application
2. Backend Setup
bash
Copy code
cd backend
npm install
✅ Create a .env file in the backend folder:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
Start the backend server:

bash
Copy code
npm run dev
3. Frontend Setup
bash
Copy code
cd ../frontend
npm install
npm run dev
🌐 Usage Guide
Register/Login using your email and password.

Connect as a Sender or Receiver.

Upload a file → the other user receives it in real time.

Files are stored temporarily and can be downloaded securely.

📂 Folder Structure
mathematica
Copy code
File-Transfer-Application/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── socket/
│   ├── uploads/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.jsx
│
└── README.md
🔒 Security Features
JWT-based authentication

Express Rate Limiter

Helmet for HTTP headers

CORS policies

Server-side file sanitization

🙌 Author
Jatin Agarwal
