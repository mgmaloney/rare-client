import React from 'react';
import PostForm from '../components/PostForm';

export default function NewPost() {
  return (
    <div>
      <h2 className="text-center" style={{ margin: '100px' }}>
        New Post
      </h2>
      <PostForm />
    </div>
  );
}
