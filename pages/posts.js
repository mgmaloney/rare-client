import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getPosts } from '../utils/data/postsData';
import DisplayPostCard from '../components/PostCard';

function PostHome() {
  const [posts, setPosts] = useState([]);

  const getAllThePosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllThePosts();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/new" passHref>
        <Button variant="success" className="m-2">Add New Post</Button>
      </Link>
      {posts.map((post) => (
        <DisplayPostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
      ))}
    </div>
  );
}

export default PostHome;
