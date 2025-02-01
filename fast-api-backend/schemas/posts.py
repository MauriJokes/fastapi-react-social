from pydantic import BaseModel
from schemas.comments import CommentResponse
from schemas.users import UserResponse
from typing import Optional

class PostCreate(BaseModel):
    image: str
    caption: str

class PostUpdate(BaseModel):
    id: int
    image: Optional[str] = None
    caption: str

class Post(BaseModel):
    id: int
    user_id: int
    image: str
    caption: str
    user: UserResponse
    comments: list[CommentResponse] = []  # Include comments in response