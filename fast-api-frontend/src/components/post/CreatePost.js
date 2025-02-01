import "./index.css";

export default function CreatePost(props) {
  const {
    editMode,
    caption,
    setCaption,
    setImage,
    preview,
    setPreview,
    handleCreatePost,
    handleSavePost,
  } = props;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview before upload
    }
  };

  return (
    <>
      <h2>{editMode ? "Edit Post" : "Create a Post"}</h2>
      <div className="image-preview-container">
        {preview && (
          <img src={preview} alt="Preview" className="image-preview" />
        )}
      </div>
      <label className="file-upload">
        Choose Image
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write a caption..."
        className="caption-input"
      />
      <button
        onClick={editMode ? handleSavePost : handleCreatePost}
        className="post-button"
      >
        {editMode ? "Save" : "Post"}
      </button>
    </>
  );
}
