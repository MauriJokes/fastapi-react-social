//REACT
import React from "react";
import { useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa"; // Kebab Menu Icon
import { MdEdit, MdDelete, MdCheck, MdCancel } from "react-icons/md";
import "./post.css";

//SERVICES
import { fetchPosts } from "../../services/post";
import { createPost, editPost, deletePost } from "../../services/post";
import {
  createComment,
  editComment,
  deleteComment,
} from "../../services/comment";

//COMPONENTS
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import CreatePost from "../../components/post/CreatePost";

//HELPERS
import ConvertToBase64 from "../../components/FileUploader";
import { omitBy, isNil } from "lodash";
import { getCurrentUserID } from "../../helpers/auth";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newComments, setNewComments] = useState({}); // Store new comment input per post
  const [editMode, setEditMode] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingComment, setEditingComment] = useState({});
  const [menuOpen, setMenuOpen] = useState(null);
  const currentUserID = getCurrentUserID();
  console.log("🚀 ~ PostsPage ~ currentUserID:", currentUserID);

  useEffect(() => {
    const fetchAllPosts = async () => {
      let data = await fetchPosts();
      const postsWithComments = data.map((post) => ({
        ...post,
        comments: post.comments || [], // Ensure comments exist
      }));
      setPosts(postsWithComments);
    };

    fetchAllPosts();
  }, []);

  /////////////////////////POST HANDLER////////////////////////////
  const handleCreatePost = async () => {
    let imageBase64;
    if (image) {
      imageBase64 = await ConvertToBase64(image);
      if (!imageBase64 || imageBase64.error) alert("Something went wrong");
    }

    let res = await createPost(
      omitBy({ image: imageBase64, caption: caption }, isNil)
    );

    if (!res.error) {
      setImage(null);
      setCaption("");
      window.location.reload();
    } else {
      alert("Failed to create post");
    }
  };

  const handleDeletePost = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (isConfirmed) {
      let res = await deletePost(id);

      if (!res.error) {
        alert("Succesfully deleted post");
        window.location.reload();
      } else {
        alert("Failed to create post");
      }
    }
  };

  const handleEditPost = (id) => {
    setModalOpen(true);
    setEditMode(true);
    setEditingPostId(id);
    setMenuOpen(null);
  };

  const handleSavePost = async () => {
    let imageBase64;
    if (image) {
      imageBase64 = await ConvertToBase64(image);
      if (!imageBase64 || imageBase64.error) alert("Something went wrong");
    }

    let res = await editPost(
      omitBy({ id: editingPostId, image: imageBase64, caption: caption }, isNil)
    );

    if (!res.error) {
      setEditingPostId(null);
      setImage(null);
      setCaption("");
      window.location.reload();
    } else {
      alert("Failed to save post");
    }
  };

  /////////////////////////COMMENT HANDLER////////////////////////////
  const handleAddComment = async (post) => {
    if (!newComments[post.id]) return;

    let res = await createComment({
      user_id: post.user_id,
      post_id: post.id,
      text: newComments[post.id],
    });
    if (!res.error) {
      window.location.reload();
      setNewComments((prev) => ({ ...prev, [post.id]: "" }));
    } else {
      alert("Failed to create post");
    }
  };

  const handleEditComment = async (id, text) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to edit this comment?"
    );
    if (isConfirmed) {
      let res = await editComment({ id, text });

      if (!res.error) {
        window.location.reload();
      } else {
        alert("Failed to edit comment");
      }
    }
  };

  const handleDeleteComment = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (isConfirmed) {
      let res = await deleteComment(id);

      if (!res.error) {
        window.location.reload();
      } else {
        alert("Failed to delete comment");
      }
    }
  };

  const commonProps = {
    editMode,
    caption,
    setCaption,
    image,
    setImage,
    preview,
    setPreview,
    handleCreatePost,
    handleSavePost,
  };

  return (
    <>
      <Navbar setModalOpen={setModalOpen} />
      <div className="posts-container">
        <h2>Feed</h2>
        {isModalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <CreatePost {...commonProps} />
          </Modal>
        )}
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="post-card">
              <div className="post-header">
                <p className="username">{post.user.name}</p>
                {currentUserID === post.user_id && (
                  <div className="menu">
                    <FaEllipsisV
                      onClick={() =>
                        setMenuOpen(menuOpen === post.id ? null : post.id)
                      }
                    />
                    {menuOpen === post.id && (
                      <div className="menu-dropdown">
                        <button onClick={() => handleEditPost(post.id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeletePost(post.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <img src={`${post.image}`} alt="Post" className="post-image" />
              <p className="caption">
                <b>{post.user.name}</b> {post.caption}
              </p>
              <ul>
                {post.comments.map((comment) => (
                  <li key={comment.id} className="comment">
                    {editingComment && editingComment.id === comment.id ? (
                      <React.Fragment>
                        <span className="comment-edit-container">
                          <p>
                            <b>{comment.user.name}:</b>
                          </p>
                          <input
                            type="text"
                            value={editingComment.text}
                            onChange={(e) =>
                              setEditingComment({
                                ...editingComment,
                                text: e.target.value,
                              })
                            }
                            className="comment-input"
                          />
                        </span>
                        <span className="comment-action-container">
                          <MdCheck
                            size={16}
                            onClick={() =>
                              handleEditComment(comment.id, editingComment.text)
                            }
                            className="comment-button"
                          />
                          <MdCancel
                            size={16}
                            onClick={() => setEditingComment({})}
                            className="comment-button"
                          />
                        </span>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <p>
                          <b>{comment.user.name}:</b> {comment.text}
                        </p>
                        {currentUserID === comment.user.id && (
                          <span className="comment-action-container">
                            <MdEdit
                              size={16}
                              onClick={() =>
                                setEditingComment({
                                  id: comment.id,
                                  text: comment.comment_text,
                                })
                              }
                              className="comment-button"
                            />
                            <MdDelete
                              size={16}
                              onClick={() => handleDeleteComment(comment.id)}
                              className="comment-button"
                            />
                          </span>
                        )}
                      </React.Fragment>
                    )}
                  </li>
                ))}
              </ul>
              <div className="comment-input-container">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="comment-input"
                  onChange={(e) =>
                    setNewComments({
                      ...newComments,
                      [post.id]: e.target.value,
                    })
                  }
                />
                <button
                  onClick={() => handleAddComment(post)}
                  className="post-btn"
                >
                  Send
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
