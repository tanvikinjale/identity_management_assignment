# Identity Management System

## Project Overview

This project is an **Identity Management System** developed as part of the academic assignment submission.  
The system allows users to securely register, authenticate, and manage their personal identity information.

### Key Features
- User Registration & Login
- JWT-based Authentication
- Secure Password Hashing (bcrypt)
- Aadhaar ID Encryption before database storage
- Profile Management (View / Update)
- Avatar Upload using Cloudinary
- Role-protected APIs using middleware

### Implementation Approach
- Backend built using **Node.js & Express**
- Frontend built using **React (Vite)**
- Database managed using **MySQL**
- Sensitive data (passwords, Aadhaar ID) is securely processed
- RESTful API architecture followed

---

## Setup / Run Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (v18+ recommended)
- MySQL
- npm / yarn
- Git

---

### Backend Setup
```bash
cd Backend
npm install
npm run dev
```
### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
---

## 📡 API Documentation

### 🔐 Authentication APIs

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/register` | Register a new user (with avatar upload) |
| POST | `/api/auth/login` | Login user and receive JWT token |

---

### 👤 User APIs (Protected)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/user` | Get logged-in user profile |
| GET | `/api/user/:id` | Get user profile by ID |
| PUT | `/api/user/updateuser` | Update user profile |
| DELETE | `/api/user/:id` | Delete user |

---

### 🔐 Authentication

Authentication is handled using **JWT Bearer Token**.

Include the token in request headers:

```http
Authorization: Bearer <your_jwt_token>
