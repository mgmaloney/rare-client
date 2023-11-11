import React, { useEffect, useState } from 'react';
import getAllPosts from '../utils/data/postsData';
import DisplayPostCard from '../components/PostCard';

function PostHome() {
  const [posts, setPosts] = useState([]);

  const getAllThePosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getAllThePosts();
  }, []);

  return (
    <div className="text-center my-4">
      {posts.map((post) => (
        <DisplayPostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
      ))}
    </div>
  );
}

export default PostHome;
