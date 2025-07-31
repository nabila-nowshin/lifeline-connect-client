# 🩸 Lifeline Connect - Blood Donation Management App

**Live Site:** [lifeline-connect-78f2e.web.app](https://lifeline-connect-78f2e.web.app/)

Lifeline Connect is a full-stack MERN application that helps connect blood donors, recipients, and volunteers on one unified platform. The system includes role-based dashboards for Admins, Volunteers, and Donors, streamlining blood request management, donation tracking, funding, and blog sharing.

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

| Tech | Details |
|------|---------|
| **Frontend** | React, React Router, Tailwind CSS (with DaisyUI), Axios, TanStack Query |
| **Authentication** | Firebase Auth |
| **Backend** | Node.js, Express.js, MongoDB |
| **Others** | JWT, imgbb image upload, SweetAlert2, Jodit React Editor |
