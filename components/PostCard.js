/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deletePost } from '../utils/data/postsData';

export default function DisplayPostCard({ postObj, onUpdate }) {
  const deleteThisPost = () => {
    if (window.confirm('Delete this routine?')) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card border="light" style={{ width: '18rem', margin: '10px', color: 'white', backgroundColor: '#86bfb3' }}>
      <h5>Title: {postObj.title}</h5>
      <h5>Content: {postObj.content}</h5>
      <h5>Date Posted: {postObj.publication_date}</h5>
      <Link href={`/posts/${postObj.id}`} passHref>
        <Button variant="success" className="m-2">Details</Button>
      </Link>
      <Button variant="danger" onClick={deleteThisPost} className="m-2">Delete</Button>
      <Link href={`/posts/edit/${postObj.id}`} passHref>
        <Button variant="primary" className="m-2">Edit</Button>
      </Link>
    </Card>
  );
}

DisplayPostCard.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    publication_date: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
