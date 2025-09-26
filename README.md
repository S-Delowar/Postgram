# Postgram – A Modern Social Media Platform

![Postgram Logo](https://via.placeholder.com/150) <!-- Replace with your logo -->

**Postgram** is a **full-stack social media platform** built with **React.js (Vite)** for the frontend and **Django REST Framework (DRF)** for the backend. It allows users to share posts, comment, like, and engage with a community in real-time.

---

## **📌 Features**

### **Frontend (React + Vite)**
- ✅ **User Authentication** – Secure login, registration, and JWT-based auth.
- ✅ **Profile Management** – Update profile details and avatars.
- ✅ **Post Creation & Interaction** – Create, edit, delete, and like posts.
- ✅ **Comment System** – Add, edit, and delete comments on posts.
- ✅ **Real-Time Updates** – **SWR** for live data fetching.
- ✅ **Responsive UI** – Built with **React Bootstrap** and **Ant Design Icons**.
- ✅ **Testing** – Comprehensive unit and integration tests with **Vitest**.

### **Backend (Django REST Framework)**
- ✅ **JWT Authentication** – Secure API access with token refresh.
- ✅ **User & Post Management** – CRUD operations for users, posts, and comments.
- ✅ **Nested Routing** – Comments under posts for RESTful structure.
- ✅ **Permissions & Security** – Custom permissions for authors and admins.
- ✅ **AWS S3 & Local Storage** – Configurable media storage.
- ✅ **Dockerized Deployment** – Easy setup with **Docker, Dokcer-Compose & Nginx**.
- ✅ **API Documentation** – Auto-generated **Swagger/OpenAPI** docs.
- ✅ **Testing** – Pytest for unit and integration testing.

---

## **🛠 Tech Stack**

### **Frontend**
- **React 19** (Vite)
- **React Router DOM** (v7)
- **SWR** (Stale-While-Revalidate)
- **Axios** (HTTP Client)
- **React Bootstrap** (UI Components)
- **Ant Design Icons** (Icons)
- **Vitest** (Testing)

### **Backend**
- **Django 5.2.4**
- **Django REST Framework (DRF) 3.16.0**
- **PostgreSQL** (Database)
- **SimpleJWT** (Authentication)
- **DRF Spectacular** (API Docs)
- **Docker & Nginx** (Deployment)
- **AWS S3** (Media Storage)
- **Pytest** (Testing)

---

## **🚀 Quick Start!**

### **Prerequisites**
- **Node.js** (v18+)
- **Python** (v3.11+)
- **Docker & Docker Compose**
- **PostgreSQL** (or use Docker)

---

### **1. Clone the Repository**
```bash
git clone https://github.com/S-Delowar/Postgram.git
cd Postgram
```

### 2. Set Up Environment Variables
Create a `.env` file at the `root/backend` directory with the following environmental variables:
```
# Django
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=*

# Database
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173

# AWS S3 (Optional)
USE_S3=FALSE
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_REGION=your-region
```

### 3. Run the Backend
**Option-1**: with Virtual environment
```bash
python -m venv .venv
.venv\Scripts\activate.bat
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Option-2**: with Docker (Recommended)
```bash
cd backend
docker-compose up --build
```

### 4. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```

- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:8000/admin

### 🧪 Testing
**Frontend**
```bash
cd frontend
npm run test
```
**Backend**
```bash
docker-compose exec web pytest
```

 ### API Documentation

The API is documented using DRF Spectacular.
Access the Swagger UI at http://localhost:8000/api/schema/swagger/ or ReDoc at http://localhost:8000/api/schema/redoc/

## API Endpoints


## Deployment
ec2, github actions,  s3(for react)

## Frontend
