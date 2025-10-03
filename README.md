# Postgram – A Modern AI-Powered Social Media Platform

**Postgram** is a **full-stack social media platform** built with React.js (Vite) and Django REST Framework (DRF).
It allows users to share posts, comment, like, and engage with a community in real-time — now enhanced with **AI-driven content moderation** and **smart summarization**

---

## **📌 Features**

### 🧠 AI-Powered Features

- 🤖 **AI Summarization** – Generate concise summaries of long posts with one click.

- 🚫 **AI Toxicity Detection** – Automatically detect and prevent posting of harmful or toxic content (e.g., insults, dismissive language).

- 💬 **Smart Feedback** – Users get detailed feedback on why content was flagged.

- ⚙️ **Modular AI Integration** – Built via DRF AI endpoints for easy scaling and future LLM-based tools.

### 💻 Frontend (React + Vite)
- ✅ **User Authentication** – Secure login, registration, and JWT-based auth.
- ✅ **Profile Management** – Update profile details and avatars.
- ✅ **Post Creation & Interaction** – Create, edit, delete, and like posts.
- ✅ **AI-Assisted Posting** – Content is checked for toxicity before submission.
- ✅ **AI Summarization Modal** – Summarize long posts instantly from the detail page.
- ✅ **Comment System** – Add, edit, and delete comments on posts.
- ✅ **Real-Time Updates** – **SWR** for live data fetching.
- ✅ **Responsive UI** – Built with **React Bootstrap** and **Ant Design Icons**.
- ✅ **Testing** – Comprehensive unit and integration tests with **Vitest**.

### ⚙️ Backend (Django REST Framework)
- ✅ **JWT Authentication** – Secure API access with token refresh.
- ✅ **User & Post Management** – CRUD operations for users, posts, and comments.
- ✅ **Nested Routing** – Comments under posts for RESTful structure.
- ✅ **Permissions & Security** – Custom permissions for authors and admins.
- ✅ **PostgreSQL Database** – Robust relational database for data storage.
- ✅ **Django Admin Panel** – Built-in admin interface for easy data management.
- ✅ **AWS S3 & Local Storage** – Configurable media storage.
- ✅ **Dockerized Deployment** – Easy setup with **Docker, Dokcer-Compose & Nginx**.
- ✅ **API Documentation** – Auto-generated **Swagger/OpenAPI** docs.
- ✅ **Testing** – Pytest for unit and integration testing.
- ✅ **AI APIs** – Smart features powered by AI:
  - /api/ai/summarize/ → Summarizes long post text into concise summaries.
  - /api/ai/toxicity-check/ → Detects toxic or harmful content and returns detailed reasons.

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
- **OpenAI API (GPT-4o-mini)**
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
CORS_ALLOWED_ORIGINS=http://localhost:5173
USE_S3=FALSE
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_REGION=your-region
OPENAI_API_KEY=your-openai-api-key
```

### 3. Run the Backend
**Option-1**: with Virtual environment
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate.bat
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
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
- **Backend With Nginx**: http://localhost:8080

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

---

 ### ⚙️ API Documentation

The API is documented using DRF Spectacular.
Access the Swagger UI at http://localhost:8000/api/schema/swagger/ or ReDoc at http://localhost:8000/api/schema/redoc/

### 📡 API Endpoints

| **Endpoint**                     | **Method** | **Description**                          | **Authentication** | **Request Body** (if applicable)                     | **Response**                     |
|----------------------------------|------------|------------------------------------------|--------------------|------------------------------------------------------|----------------------------------|
| **AI Endpoints**                 |            |                                          |                    |                                                      |                                  |
| `/api/ai/summarize/`             | POST       | Generate summary for post text  | JWT                | `text`                                               | Summarized text         |
| `/api/ai/toxicity-check/`        | POST       | Check if post contains toxic language    | JWT                | `text`                                               | `toxic` boolean and `reasons` array|
| **Authentication**               |            |                                          |                    |                                                      |                                  |
| `/api/auth/register/`            | POST       | Register a new user                     | None               | `email`, `username`, `first_name`, `last_name`, `avatar`, `password` | User data + JWT tokens           |
| `/api/auth/login/`               | POST       | Login and get JWT tokens                | None               | `email`, `password`                                  | User data + JWT tokens           |
| `/api/auth/refresh/`             | POST       | Refresh access token                     | None               | `refresh`                                           | New access token                 |
| **Users**                        |            |                                          |                    |                                                      |                                  |
| `/api/user/`                     | GET        | List all users (superuser only)         | JWT                | -                                                    | List of users                   |
| `/api/user/me/`                  | GET        | Get current user profile                | JWT                | -                                                    | User profile data               |
| `/api/user/{id}/`                | GET        | Get a user profile                      | JWT                | -                                                    | User profile data               |
| `/api/user/{id}/`                | PATCH      | Update a user profile                   | JWT                | `username`, `first_name`, `last_name`, `email`, `avatar` | Updated user data               |
| **Posts**                        |            |                                          |                    |                                                      |                                  |
| `/api/post/`                     | GET        | List all posts                          | None               | -                                                    | List of posts                   |
| `/api/post/`                     | POST       | Create a new post                       | JWT                | `body`                                               | Created post data               |
| `/api/post/{id}/`                | GET        | Get a single post                       | None               | -                                                    | Post data                        |
| `/api/post/{id}/`                | PUT        | Update a post                           | JWT                | `body`                                               | Updated post data               |
| `/api/post/{id}/`                | PATCH      | Partially update a post                 | JWT                | `body`                                               | Updated post data               |
| `/api/post/{id}/`                | DELETE     | Delete a post                           | JWT                | -                                                    | Success message                 |
| `/api/post/{id}/like/`           | POST       | Like/unlike a post                      | JWT                | -                                                    | `status: liked/unliked`         |
| `/api/post/{id}/comment/`        | POST       | Add a comment to a post                 | JWT                | `body`                                               | Created comment data            |
| `/api/post/{id}/comments/`       | GET        | List all comments for a post            | None               | -                                                    | List of comments                |
| `/api/post/by-author/{user_id}/` | GET        | List posts by a specific author         | None               | -                                                    | List of posts                   |
| **Comments**                     |            |                                          |                    |                                                      |                                  |
| `/api/comments/{id}/`            | GET        | Get a single comment                    | None               | -                                                    | Comment data                    |
| `/api/comments/{id}/`            | PATCH      | Update a comment                        | JWT                | `body`                                               | Updated comment data            |
| `/api/comments/{id}/`            | DELETE     | Delete a comment                        | JWT                | -                                                    | Success message                 |


---

## 🖥️ Frontend View
<img src="https://github.com/user-attachments/assets/1cb77cc7-ddd8-4320-a76e-b162dd39e622" alt="UI"/>

---

<!-- 
## Deployment
ec2, github actions,  s3(for react)
-->
