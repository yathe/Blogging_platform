import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:5000/api/posts');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="post-list">
      <h1>All Posts</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search Posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="post-container">
        {filteredPosts.map(post => (
          <div className="post-item" key={post._id}>
            <h2>{post.title}</h2>
            <p>By {post.author}</p>
            <Link to={`/posts/${post._id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
