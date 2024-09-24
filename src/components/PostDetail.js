import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!post) return <div>No post found</div>;

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      {post.image && <img src={post.image} alt="Post" />}
      <p>{post.content}</p>
      <p>By {post.author}</p>
      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetail;
