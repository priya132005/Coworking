# 🚀 Coworking Space Booking Platform

A full-stack coworking space booking platform that enables users to discover coworking spaces, check real-time availability, book workspaces by the hour, and manage reservations seamlessly.

Designed and developed as a production-ready MERN application featuring secure authentication, role-based access control, booking management, email services, image uploads, and a comprehensive admin dashboard.

---

## ✨ Key Features

### 👤 User Features

* JWT-based Authentication
* User Registration & Login
* Forgot & Reset Password via Email
* Browse & Search Coworking Spaces
* Real-Time Availability Checking
* Hourly Workspace Booking
* Booking Conflict Prevention
* Mock Payment Integration
* Booking History & Cancellation
* Contact Support via Email

### 🛠️ Admin Features

* Admin Dashboard with Platform Statistics
* User Management (Promote/Demote Roles)
* Space Management (Create, Read, Update, Delete)
* Workspace Image Uploads
* Booking Management
* Reservation Confirmation & Cancellation

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router
* Axios
* Vite

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Nodemailer
* Multer

---

## 🏗️ Architecture

```text
React + Redux Frontend
          │
          ▼
Express.js REST API
          │
          ▼
MongoDB Atlas Database
```

---

## 💡 Challenges Solved

### Real-Time Booking Validation

Implemented booking conflict detection to prevent overlapping reservations for the same workspace and time slot.

### Secure Authentication

Built JWT-based authentication with protected routes and password reset functionality using email verification.

### Role-Based Access Control

Created separate authorization flows for users and administrators to ensure secure resource management.

### File Upload Management

Integrated Multer for workspace image uploads and storage.

---

## 📸 Application Screenshots

### 🏠 Home Page

![Home Page](./Coworking-Platform/CoworkingFrontend/public/home.png)

### 🔍 Space Listings

![Space Listings](./Coworking-Platform/CoworkingFrontend/public/space.png)

### 📅 Booking Flow

![Booking Flow](./Coworking-Platform/CoworkingFrontend/public/booking.png)

### ⚙️ Admin Dashboard

![Admin Dashboard](./Coworking-Platform/CoworkingFrontend/public/Admin.png)

## 🚀 Installation



###  Backend Setup

```bash
cd CoworkingBackend/Coworkingbackend

npm install

npm run seed

npm run dev
```

###  Frontend Setup

```bash
cd CoworkingFrontend

npm install

npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend directory and configure:

```env
PORT=3000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 📂 Project Structure

```text
CoworkingBackend/
└── Coworkingbackend/
    ├── Controllers/
    ├── Models/
    ├── Routes/
    ├── Middleware/
    ├── uploads/
    ├── Config/
    └── server.js

CoworkingFrontend/
├── public/
│   ├── home.png
│   ├── space.png
│   ├── booking.png
│   └── Admin.png
├── src/
└── vite.config.js
```

---

## 🌟 Highlights

* Full-Stack MERN Application
* RESTful API Architecture
* Secure JWT Authentication
* Role-Based Authorization
* Real-Time Booking Validation
* Image Upload Functionality
* Email-Based Password Recovery
* Responsive User Interface
* Admin Dashboard & Analytics
* MongoDB Atlas Integration

---

## 🔮 Future Improvements

* Stripe/Razorpay Payment Integration
* Google OAuth Authentication
* Workspace Reviews & Ratings
* Cloudinary / AWS S3 Image Storage
* Real-Time Notifications
* Advanced Analytics Dashboard
* Multi-Vendor Workspace Management
* Calendar Synchronization
* Mobile Application Support

---

## 👨‍💻 Developer

Built using the MERN Stack to demonstrate full-stack application development, REST API design, authentication and authorization, booking workflow management, database modeling, file uploads, email integration, and deployment-ready architecture.

This project showcases practical experience in developing scalable web applications using modern frontend and backend technologies.
