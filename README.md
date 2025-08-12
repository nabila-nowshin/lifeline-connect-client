# 🩸 Lifeline Connect - Blood Donation Management App

**Live Site:** [lifeline-connect-78f2e.web.app](https://lifeline-connect-78f2e.web.app/)

Lifeline Connect is a full-stack MERN- application that helps connect blood donors, recipients, and volunteers on one unified platform. The system includes role-based dashboards for Admins, Volunteers, and Donors, streamlining blood request management, donation tracking, funding, and blog sharing.

## 🚀 Features

### 🔐 Authentication & Authorization

- Firebase Authentication (Email/Password)
- JWT Token-based secure APIs
- Protected routes
- Role-based access control (`Admin`, `Volunteer`, `Donor`)

### 👤 User Roles & Dashboards

- **Donors:** View and manage personal donation requests, donation history
- **Volunteers:** View and manage all requests, verify users
- **Admins:** Manage users, roles, blogs, funding, and requests

### 📝 Core Functionalities

- Request & manage blood donations
- Approve, block, or verify users
- Donation request filtering & pagination
- Create and publish blogs with rich text editor
- Track funding progress (Admins only)

### 🌐 Tech Stack

| Tech               | Details                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| **Frontend**       | React, React Router, Tailwind CSS (with DaisyUI), Axios, TanStack Query |
| **Authentication** | Firebase Auth                                                           |
| **Backend**        | Node.js, Express.js, MongoDB                                            |
| **Others**         | JWT, imgbb image upload, SweetAlert2, Jodit React Editor                |

---

## 🧰 Dependencies

This project uses the following main dependencies:

- React (via Vite) — Frontend framework
- Tailwind CSS — Styling
- Firebase — Authentication and Hosting
- React Router — Client-side routing
- Axios — For API calls (if used)
- Other dependencies as listed in `package.json`

---

## 🚀 How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/nabila-nowshin/lifeline-connect-client.git

   cd lifeline-connect-client

   ```

2. **Install dependencies**
   ```
   npm install
   ```
3. **Set up Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Get your Firebase config keys (API key, authDomain, projectId, etc.).
   - Create a `.env` file in the root folder (make sure `.env` is in `.gitignore`) and add your Firebase config as environment variables or replace config in your Firebase initialization file accordingly.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your app**

   Open your browser and go to `http://localhost:5173` (or the port shown in the terminal).

   ***

## Backend Server

The backend API powers this application using Node.js, Express, and MongoDB. It includes:

- Secure JWT-based authentication
- Role-based access control for Admin, Volunteer, and Donor
- Efficient management of blood donation requests, user roles, and data

Explore the backend code here: [Backend Repository](https://github.com/nabila-nowshin/lifeline-connect-server)
