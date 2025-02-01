from pydantic import BaseModel
from schemas.users import UserResponse

class CommentCreate(BaseModel):
    post_id: int
    text: str

class CommentResponse(BaseModel):
    id: int
    text: str
    user: UserResponse

class CommentUpdate(BaseModel):
    id: int
    text: str

class CommentDelete(BaseModel):
    id: int

class Comment(BaseModel):
    id: int
    user_id: int
    post_id: int
    text: str

    class Config:
        orm_mode = True