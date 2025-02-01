from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from controllers import comments, users
from schemas import comments as schema
from models import User
from database import get_db

router = APIRouter()

# Create a new comment
@router.post("/create", response_model=schema.CommentCreate)
def create_comment(post: schema.CommentCreate, db: Session = Depends(get_db), current_user: User = Depends(users.get_current_user)):
    return comments.create_comment(db=db, text=post.text, post_id=post.post_id, user_id=current_user.id)

# Get comments for a post
@router.get("/list/{post_id}", response_model=list[schema.Comment])
def get_comments(post_id: int, db: Session = Depends(get_db)):
    return comments.get_comments_for_post(db=db, post_id=post_id)

# Update a comment
@router.put("/update", response_model=schema.Comment)
def update_comment(post: schema.CommentUpdate, db: Session = Depends(get_db), current_user: User = Depends(users.get_current_user)):
    db_comment = comments.update_comment(db=db, comment_id=post.id, text=post.text)
    if db_comment is None or db_comment.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Comment not found or you are not the owner")
    return db_comment

# Delete a comment
@router.delete("/delete/{comment_id}", response_model=schema.CommentDelete)
def delete_comment(comment_id: int, db: Session = Depends(get_db), current_user: User = Depends(users.get_current_user)):
    db_comment = comments.delete_comment(db=db, comment_id=comment_id)
    if db_comment is None or db_comment.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Comment not found or you are not the owner")
    return db_comment
