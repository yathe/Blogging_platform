import React, { useState, useEffect } from 'react';
import './CommentSection.css';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [author, setAuthor] = useState(''); // Add state for author

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/comments/${postId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      postId: postId,  // Assuming postId is passed as a prop
      content: commentText,
      author: author || 'Anonymous',  // Use default value if author is not provided
    };

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit comment: ${response.statusText}`);
      }

      const newComment = await response.json();
      setComments([...comments, newComment]); // Add new comment to the list
      setCommentText(''); // Clear the textarea after submission
      setAuthor(''); // Clear the author input field after submission
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <p>{comment.content}</p>
          <p>By {comment.author}</p>
        </div>
      ))}

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment"
          required
        ></textarea>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name (optional)"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentSection;
