from sqlalchemy.orm import Session
from models import Comment
from schemas import comments as schema

def create_comment(db: Session, text: str, post_id: int, user_id: int):
    db_comment = Comment(text=text, post_id=post_id, user_id=user_id)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

def get_comments_for_post(db: Session, post_id: int, skip: int = 0, limit: int = 10):
    return db.query(Comment).filter(Comment.post_id == post_id).offset(skip).limit(limit).all()

def update_comment(db: Session, comment_id: int, text: str):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment:
        db_comment.text = text
        db.commit()
        db.refresh(db_comment)
    return db_comment

def delete_comment(db: Session, comment_id: int):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment:
        db.delete(db_comment)
        db.commit()
    return db_comment
