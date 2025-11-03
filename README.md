# 🏥 ConnectMed – Smart Hospital Management System

### 🌍 [Live Website →](https://connect-med-frontend.onrender.com)  
### 👨‍💻 [Admin Dashboard →](https://connect-med-admin.onrender.com/admin-dashboard)

---

## 📖 Project Overview

**ConnectMed** is a full-stack hospital management system designed to streamline hospital operations, enhance patient experience, and provide efficient access to healthcare services.

The platform connects **Patients**, **Doctors**, and **Admins** in a seamless system to manage **appointments, schedules, patient information, and hospital operations efficiently**.

Built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**, ConnectMed features **JWT-based authentication** and **role-specific dashboards** for secure and reliable hospital management.

---

## 🚀 Features

### 👩‍⚕️ Patient Dashboard
- Register, log in, and manage personal profiles securely.  
- Book, reschedule, or cancel doctor appointments.  
- View doctor details, specialization, and availability.  

### 🩺 Doctor Dashboard
- View and manage daily appointments.  
- Update their profile information and availability.  
- Check patient appointment history and status. 

### 🛠️ Admin Dashboard
- Manage hospital data, departments, appointments and staff.  
- Add, edit, or remove doctors and patient accounts.  
- Assign and manage administrative tasks efficiently.

### 🔐 Secure Authentication
- **JWT-based** user authentication.  
- Protected routes and role-based access control.  
- Passwords are encrypted using **bcrypt**.

### 🌐 Responsive UI
- Built with **React.js** and optimized for all screen sizes.  
- Clean and intuitive interface for patients, doctors, and admins.

### ⚙️ RESTful APIs
- Robust API endpoints for seamless client-server communication.  
- CRUD operations for users, appointments, and records.

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Token) |
| **Deployment** | Render (Backend) + OnRender (Frontend & Admin) |

---

## 🌐 Live Links

- 🔗 **Frontend (Patient/Doctor Portal):** [https://connect-med-frontend.onrender.com](https://connect-med-frontend.onrender.com)  
- 🔗 **Admin Dashboard:** [https://connect-med-admin.onrender.com/admin-dashboard](https://connect-med-admin.onrender.com/admin-dashboard)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ConnectMed.git
cd ConnectMed  
```
### 2️⃣ Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the **backend** folder and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**Admin:**
```bash
cd ../admin
npm install
```
## 4️⃣ Run the Application

### 🚀 Start Backend
```bash
cd backend
nodemon server.js
```

### 💻 Start Frontend
```bash
cd frontend
npm run dev
```

### 🧭 Start Admin Panel
```bash
cd admin
npm run dev
```
---

## 🌐 Access the App

- 🧑‍⚕️ **Frontend (Patient/Doctor):** [http://localhost:5173](http://localhost:5173)  
- 🧭 **Admin Panel:** [http://localhost:5174](http://localhost:5174)  
- ⚙️ **Backend Server:** [http://localhost:5000](http://localhost:5000)

---

## ✨ Acknowledgment

**ConnectMed** was created to simplify hospital workflows and improve collaboration between healthcare providers and patients.  
It aims to deliver **efficiency, transparency, and accessibility** in hospital management — ensuring better healthcare for all.

---
