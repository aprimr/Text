# Text.

A clean and minimal **public chat room** built with **React**, **TailwindCSS**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**.

No sign-up. No login. No tracking.  
Just enter a name — and start chatting.

---

## 🧠 About

**Text.** is a simple, real-time public chat application where:

- 🔐 No personal data is required
- 🧼 Clean and minimal UI
- ⚡ Real-time messaging with WebSockets
- 🗑️ New identity every session — even if the username is the same

---

## 🚀 Tech Stack

### Frontend

- React
- TailwindCSS
- Socket.IO Client

### Backend

- Node.js
- Express.js
- MongoDB
- Socket.IO

---

## 📁 Project Structure

text/ ├── client/ # React frontend │ └── src/ ├── server/ # Express backend │ └── models/ │ └── routes/ │ └── controllers/ ├── README.md

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

git clone https://github.com/your-username/text.git cd text

yaml
Copy
Edit

---

### 2. Backend Setup

cd server npm install

shell
Copy
Edit

#### Create a `.env` file in the `server` directory:

PORT=5000 MONGO_URI=mongodb://localhost:27017/text

shell
Copy
Edit

#### Start the backend server:

npm run dev

yaml
Copy
Edit

Server runs at: `http://localhost:5000`

---

### 3. Frontend Setup

cd ../client npm install

shell
Copy
Edit

#### Create a `.env` file in the `client` directory:

VITE_BACKEND_URL=http://localhost:5000

shell
Copy
Edit

#### Start the frontend development server:

npm run dev

yaml
Copy
Edit

Frontend runs at: `http://localhost:5173`

---

## 🔍 Features

- ✅ Public chat room
- ✅ Real-time updates with Socket.IO
- ✅ No authentication or registration
- ✅ Mobile responsive
- ✅ Auto-scroll to latest messages
- ✅ Logout anytime and start fresh

---

## 🖼️ Preview

> Add a screenshot or link to a live demo if available

---

## 📜 License

This project is licensed under the **MIT License** — use it freely!

---

Made with 💙 for the love of simple, open communication.
