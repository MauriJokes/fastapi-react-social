from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from models import Post, Comment
from schemas import posts as schema
from sqlalchemy.orm import joinedload

# Create a new post
def create_post(db: Session, post: schema.PostCreate, user_id: int):
    db_post = Post(user_id=user_id, image=post.image, caption=post.caption)
    db.add(db_post)
    try:
        db.commit()
        db.refresh(db_post)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Post creation failed")
    return db_post

# Get all posts for a user
def get_posts(db: Session, user_id: int, skip: int = 0, limit: int = 10):
    return db.query(Post).options(
        joinedload(Post.user), 
        joinedload(Post.comments).joinedload(Comment.user)
    ).all()

# Get a specific post by ID
def get_post(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()

# Update a post (caption or image)
def update_post(db: Session, post_id: int, post: schema.PostCreate):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    db_post.caption = post.caption if post.caption else db_post.caption
    db_post.image = post.image if post.image else db_post.image
    db.commit()
    db.refresh(db_post)
    return db_post

# Delete a post
def delete_post(db: Session, post_id: int):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(db_post)
    db.commit()
    return {"message": "Post deleted successfully"}
