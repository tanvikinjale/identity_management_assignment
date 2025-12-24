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
## ☁️ Cloudinary Integration (Media Storage)

This project uses **Cloudinary** for secure cloud-based storage of user avatar images during registration and profile updates.

### 🔧 Purpose
- Store user avatar images remotely
- Avoid storing large media files on the backend server
- Automatically handle image uploads and delivery via URLs

### 🛠️ Implementation Details
- Images are uploaded using the official **Cloudinary Node.js SDK**
- File upload is handled using **Multer**
- After successful upload, the local file is deleted from the server to save storage
- The generated Cloudinary URL is stored in the database (`avatar_url` column)

### 📂 Usage Location
- **Backend Utility:** `config/cloudinary.js`
- **Used In:** User registration API (`/api/auth/register`)

### 🔐 Security Note
- Cloudinary credentials are configured in the backend
- In production, these credentials should be stored in **environment variables (`.env`)** instead of hardcoding

### 📌 Example Flow
1. User uploads avatar during registration
2. Multer saves the image temporarily on the server
3. Image is uploaded to Cloudinary
4. Cloudinary returns a public image URL
5. URL is stored in the database
6. Local file is deleted
---

## Setup / Run Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (v18+ recommended)
- react.js
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
````

## 🗄️ Database Schema

### 📋 `users` Table

| Column Name | Type | Description |
|-----------|------|------------|
| user_id | INT (PK) | Unique user ID |
| first_name | VARCHAR | First name |
| middle_name | VARCHAR | Middle name (optional) |
| last_name | VARCHAR | Last name |
| email | VARCHAR | Unique email |
| password_hash | VARCHAR | Hashed password |
| contact_number | VARCHAR(10) | Phone number |
| birthdate | DATE | Date of birth |
| gender | ENUM | Male / Female / Other |
| state | VARCHAR | Indian state |
| aadhar_id | TEXT | Encrypted Aadhaar ID |
| avatar_url | TEXT | Cloudinary image URL |
| created_at | TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | Last update time |

## 🤖 AI Tool Usage Log

### 🧠 AI Tools Used
- **ChatGPT**
- **Claude**

---

### 🛠️ AI-Assisted Tasks
- Designed REST API structure and route naming
- Implemented Aadhaar encryption logic
- Helped structure JWT authentication middleware
- Frontend form validation logic
- React Dashboard UI improvements
- Error handling and debugging runtime issues
- README documentation formatting

---

### ⭐ Effectiveness Score
**Score:** 3 / 5

**Justification:**  
AI tools significantly reduced development time by assisting with boilerplate code, debugging complex Node.js module issues, and structuring APIs correctly.  
Some AI-generated suggestions required manual debugging (especially around SQL queries and module systems), but overall productivity improved substantially.
