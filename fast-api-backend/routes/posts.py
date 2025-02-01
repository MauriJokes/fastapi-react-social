from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from models import User
from schemas import posts as schemas
from database import get_db
from controllers import posts, users

router = APIRouter()

@router.post("/create", response_model=schemas.PostCreate)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db), current_user: User = Depends(users.get_current_user)):
    return posts.create_post(db=db, post=post, user_id=current_user.id)

# Get all posts for a user
@router.get("/list", response_model=list[schemas.Post])
def get_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user: User = Depends(users.get_current_user)):
    return posts.get_posts(db=db, user_id=current_user.id, skip=skip, limit=limit)

# Get a specific post by ID
@router.get("/fetch/{post_id}", response_model=schemas.Post)
def get_post(post_id: int, db: Session = Depends(get_db)):
    db_post = posts.get_post(db=db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

# Update a post (caption or image)
@router.patch("/update", response_model=schemas.Post)
def update_post(post: schemas.PostUpdate, db: Session = Depends(get_db), current_user: User = Depends(users.get_current_user)):
    db_post = posts.get_post(db=db, post_id=post.id)
    if db_post is None or db_post.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Post not found or you don't have permission")
    
    return posts.update_post(db=db, post_id=post.id, post=post)

# Delete a post
@router.delete("/delete/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db), current_user: User = Depends(users.get_current_user)):
    db_post = posts.get_post(db=db, post_id=post_id)
    if db_post is None or db_post.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Post not found or you don't have permission")

    return posts.delete_post(db=db, post_id=post_id)