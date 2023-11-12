/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { deletePost, getSinglePost } from '../../utils/data/postsData';

const ViewPost = () => {
  const router = useRouter();
  const [postDetails, setPostDetails] = useState({});
  const { id } = router.query;

  const deleteThisPost = () => {
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => router.push('/posts'));
    }
  };

  useEffect(() => {
    getSinglePost(id).then((postData) => {
      setPostDetails(postData);
    });
  }, [id]);

  console.warn(postDetails);

  return (
    <>
      <Card className="text-center">
        <img src={postDetails.image_url} alt={postDetails.title} style={{ height: '8em' }} />
        <Card.Title> {postDetails.title}</Card.Title>
        <p>posted on: {postDetails.publication_date}</p>
        <p>{postDetails.content}</p>
        <div>
          <strong>Comments:</strong>
          <ul>
            {postDetails.comments?.map((comment) => (
              <ul key={comment.id}>
                <p><strong>{comment.author.username}:</strong> {comment.content}</p>
              </ul>
            ))}
          </ul>
        </div>
        <div>
          <strong>Tags:</strong>
          <ul>
            {postDetails.post_tags?.map((tags) => (
              <ul key={tags.id}>
                <p>{tags.tag.label}</p>
              </ul>
            ))}
          </ul>
        </div>
        <Button variant="danger" onClick={deleteThisPost} className="m-2">
          Delete Post
        </Button>
      </Card>
    </>
  );
};

export default ViewPost;
