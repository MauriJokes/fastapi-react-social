from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends
from sqlalchemy.exc import IntegrityError
from fastapi.security import OAuth2PasswordBearer
from database import get_db
from schemas import users as schema
from models import User
from controllers import auths

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Create a new user
def create_user(db: Session, user: schema.UserCreate):
    # Check if user with the same email already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password before saving
    hashed_password = auths.hash_password(user.password)
    
    db_user = User(
        email=user.email,
        password=hashed_password,
        name=user.name
    )
    
    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="User creation failed")
    
    return db_user

# To get user by email
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

# Get current user by token
def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = auths.get_user_by_token(db, token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token or user not found")
    return user
