# 🌐 SeylaniConnect – Empowering Community Support

SeylaniConnect is a responsive web app designed to help users **book appointments** and **request assistance**, while admins manage and monitor all activity through a dedicated dashboard. Built using React, Firebase, Tailwind CSS, and deployed via Vercel.

---

## 🔗 Live Demo

👉 **[https://seylani-connect.vercel.app](https://seylani-connect.vercel.app)**

---

## ✨ Features

### 👤 User Panel
- ✅ Signup/Login with Firebase Auth
- ✅ Book Appointments with reason, date & time
- ✅ Submit Help Requests (Food, Health, Education, Other)
- ✅ View all submitted requests with their status
- ✅ Clean dashboard with quick access buttons

### 🛠 Admin Panel
- ✅ Secure Login (no signup)
- ✅ Dashboard with total counts of appointments and help requests
- ✅ View & manage all user submissions
- ✅ Approve or reject requests with one click

---

## 🔐 Admin Login

> Use the following credentials to access the admin panel:

Email: admin@seylani.com
Password: admin1234

yaml
Copy
Edit

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **UI Framework:** Tailwind CSS
- **Backend & Auth:** Firebase (Auth + Firestore)
- **Deployment:** Vercel

---

## 📁 Folder Structure

src/
├── adminPages/
│ ├── Dashboard.jsx
│ ├── Appointments.jsx
│ └── HelpRequests.jsx
├── userPages/
│ ├── Signup.jsx
│ ├── Login.jsx
│ ├── Home.jsx
│ ├── BookAppointment.jsx
│ ├── RequestHelp.jsx
│ └── MyRequests.jsx
├── components/
│ └── ProtectedRoute.jsx
├── context/
│ └── AuthContext.js
├── services/
│ └── firebase.js
└── App.jsx

yaml
Copy
Edit

---

## 💻 Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/seylani-connect.git
cd seylani-connect
npm install
npm run dev
Make sure to configure Firebase SDK in /src/services/firebase.js

📝 License
This project is developed for educational and community service purposes under the MIT License.

🤝 Inspired By
The community outreach and welfare mission of Seylani Welfare Trust.