from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from controllers import auths, users
from schemas.token import Token
from schemas.login import Login
from database import get_db

router = APIRouter()

# User login route
@router.post("/login", response_model=Token)
def login(credentials: Login, db: Session = Depends(get_db)):
    db_user = users.get_user_by_email(db, email=credentials.email)
    
    if db_user is None or not auths.verify_password(credentials.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate access token
    access_token = auths.create_access_token(data={"sub": db_user.id})
    return {"access_token": access_token, "token_type": "bearer", "user_id": db_user.id}