# SocialHub - A Simple Social Media App

SocialHub is a full-stack social media application that allows users to create, edit, and delete posts with image uploads. Users can also comment on posts, edit and delete comments, and manage their accounts. The project is built using **FastAPI** for the backend and **React.js** for the frontend, with **Docker** for containerization and **AWS** for deployment.

## 🚀 Features

✅ User authentication (Register/Login/Logout)  
✅ Create, edit, and delete posts with image uploads  
✅ View posts in a social media-style feed  
✅ Comment on posts, edit, and delete comments  
✅ Secure API with JWT authentication  
✅ Fully containerized using Docker  
✅ Deployed on AWS

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- CSS (custom styling)
- FontAwesome for icons

### Backend

- FastAPI
- SQLite (or PostgreSQL in production)
- SQLAlchemy for ORM
- JWT for authentication
- Passlib for password hashing

### Deployment & Tools

- Docker & Docker Compose
- AWS (EC2, S3, or other services)
- Nginx (for reverse proxy)

## 📂 Project Structure

```
/fastapi-backend
│── main.py                 # FastAPI app entry point
│── models.py               # Database models
│── schemas.py              # Pydantic schemas
│── routes/                 # API routes
│── security.py             # JWT authentication & password hashing
│── crud.py                 # CRUD operations
│── database.py             # Database connection
│── Dockerfile              # Backend Dockerfile
│── requirements.txt        # Backend dependencies

/frontend
│── src/
│   ├── components/         # Reusable React components
│   ├── pages/              # Pages (Home, Login, Register, etc.)
│   ├── App.js              # Main App component
│   ├── index.js            # React entry point
│── public/                 # Static assets
│── Dockerfile              # Frontend Dockerfile
│── package.json            # Frontend dependencies
```

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/socialhub.git
cd socialhub
```

### 2️⃣ Backend Setup

```bash
cd fastapi-backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

### 4️⃣ Running with Docker

```bash
docker-compose up --build
```

## 🌍 API Endpoints

| Method | Endpoint          | Description             | Auth Required |
| ------ | ----------------- | ----------------------- | ------------- |
| POST   | `/users/register` | Register a new user     | ❌ No         |
| POST   | `/users/login`    | Login and get JWT token | ❌ No         |
| GET    | `/posts`          | Get all posts           | ✅ Yes        |
| POST   | `/posts`          | Create a new post       | ✅ Yes        |
| PATCH  | `/posts/{id}`     | Edit a post             | ✅ Yes        |
| DELETE | `/posts/{id}`     | Delete a post           | ✅ Yes        |
| POST   | `/comments`       | Add a comment to a post | ✅ Yes        |
| DELETE | `/comments/{id}`  | Delete a comment        | ✅ Yes        |

## 🚀 Deployment

1. **Build Docker images**

   ```bash
   docker-compose up --build -d
   ```

2. **Set up environment variables**

   - `.env` for backend (JWT secret, database URL, etc.)
   - `.env` for frontend (API base URL)

3. **Deploy to AWS**
   - Use EC2 for backend
   - Use S3 or CloudFront for frontend
   - Set up Nginx as a reverse proxy

## 📝 Future Improvements

- ✅ Add like feature for posts
- ✅ Improve UI with better animations
- ✅ Implement WebSocket for real-time updates
- ✅ Switch to PostgreSQL for production

---

## 📜 License

This project is **MIT Licensed**. You can use, modify, and distribute it freely.

## 👨‍💻 Author

Developed by **[Your Name]** ✨
