from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import auths, users, posts, comments

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auths.router, prefix="/auths")
app.include_router(users.router, prefix="/users")
app.include_router(posts.router, prefix="/posts")
app.include_router(comments.router, prefix="/comments")

# Allow frontend at http://localhost:3000 to access FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow only frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "CORS is now enabled!"}
