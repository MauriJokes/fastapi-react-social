from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import users as user
from controllers import users

router = APIRouter()

@router.post("/register", response_model=user.UserResponse)
def register(user: user.UserCreate, db: Session = Depends(get_db)):
    return users.create_user(db=db, user=user)