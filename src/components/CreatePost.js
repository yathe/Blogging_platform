import React, { useState } from 'react';
import "./CreatePost.css"; // Importing the CSS styles

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!title || !content || !author) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to create post');
      }

      const data = await response.json();
      console.log("Post created:", data);
      setTitle('');
      setContent('');
      setAuthor('');
      setError(null); // Reset error on success
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="create-post">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <textarea 
            id="author" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea 
            id="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
