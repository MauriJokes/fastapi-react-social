# SocialHub - A Simple Social Media App

SocialHub is a full-stack social media application that allows users to create, edit, and delete posts with image uploads. Users can also comment on posts, edit and delete comments, and manage their accounts. The project is built using **FastAPI** for the backend and **React.js** for the frontend, with **Docker** for containerization and **AWS** for deployment.

## Live Deployment

This application is live at: http://54.169.158.27/

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
- React-icons for icons

### Backend

- FastAPI
- SQLite (or PostgreSQL in production)
- SQLAlchemy for ORM
- JWT for authentication
- Passlib for password hashing

### Deployment & Tools

- Docker & Docker Compose
- AWS (EC2 instance)
- Nginx (for reverse proxy)

## 📂 Project Structure

```
/fast-api-backend
│── main.py                 # FastAPI app entry point
│── models.py               # Database models
│── controller/             # API Logic
│── schemas/                # Pydantic schemas
│── routes/                 # API routes
│── database.py             # Database connection
│── Dockerfile              # Backend Dockerfile
│── .env                    # Environment Variables
│── .venv                   # Virtual environment set up
│── requirements.txt        # Backend dependencies

/fast-api-frontend
│── src/
│   ├── components/         # Reusable React components
│   ├── helpers/            # Reusable helper functions
│   ├── pages/              # Pages (Home, Login, Register, etc.)
│   ├── services/           # HTTP request functions
│   ├── App.js              # Main App component
│   ├── index.js            # React entry point
│── public/                 # Static assets
│── Dockerfile              # Frontend Dockerfile
│── package.json            # Frontend dependencies
│── .env                    # Environment variables
```

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/MauriJokes/fastapi-react-social.git
cd fastapi-react-social
```

### 2️⃣ Backend Setup

```bash
cd fast-api-backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt # Or pip freeze > requirements.txt
uvicorn main:app --reload
```

### 3️⃣ Frontend Setup

```bash
cd fast-api-frontend
npm install
npm install --global yarn
yarn
yarn start
```

### 4️⃣ Running with Docker

```bash
docker-compose up --build
```

## 🌍 API Endpoints

| Method | Endpoint          | Description                            | Auth Required |
| ------ | ----------------- | -------------------------------------- | ------------- |
| POST   | `/users/register` | Register a new user                    | ❌ No         |
| POST   | `/auths/login`    | Login and get JWT token                | ❌ No         |
| GET    | `/posts/list`     | Get all posts and comments in the post | ✅ Yes        |
| POST   | `/posts/create`   | Create a new post                      | ✅ Yes        |
| PUT    | `/posts/update`   | Edit a post                            | ✅ Yes        |
| DELETE | `/posts/{id}`     | Delete a post                          | ✅ Yes        |
| POST   | `/comments`       | Add a comment to a post                | ✅ Yes        |
| GET    | `/comments/list`  | Get all comments                       | ✅ Yes        |
| DELETE | `/comments/{id}`  | Delete a comment                       | ✅ Yes        |

For more information, visit http://127.0.0.1:8000/docs to see the Swagger UI once you run the app. Alternatively, you can visit http://54.169.158.27:8000/docs for the live Swagger UI.

## 🚀 Deployment

1. **Build Docker images**

   ```bash
   docker-compose up --build -d
   ```

2. **Set up environment variables**

   - `.env` for backend (JWT secret, database URL, etc.)

      ```bash
     SECRET_KEY=1dFwfDk4OxUrDpJAV6cxdGQFz9MjN7NYldVqFbK2DOFvhU4XJPT2HqKqjsy5YoS/
     ALGORITHM=HS256
     ACCESS_TOKEN_EXPIRE_MINUTES=1440
     DATABASE_URL=sqlite:///./database.db
      ```

   - `.env` for frontend (API base URL)

      ```bash
      REACT_APP_API_URL=http://127.0.0.1:8000
      REACT_APP_ENV=development
      ```

## 📝 Future Improvements

- ✅ Add like feature for posts
- ✅ Improve UI with better animations
- ✅ Implement WebSocket for real-time updates
- ✅ Switch to PostgreSQL for production
- ✅ Purchase a domain name
- ✅ Setting Up a Domain and Securing API with HTTPS on AWS

---

## 📜 License

This project is **MIT Licensed**. You can use, modify, and distribute it freely.

## 👨‍💻 Author

Developed by **Nik Adam**
