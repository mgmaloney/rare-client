/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { deletePost } from '../utils/data/postsData';

export default function DisplayPostCard({ postObj }) {
  return (
    <Card border="light" style={{ width: '18rem', margin: '10px', color: 'white', backgroundColor: '#86bfb3' }}>
      <h5>Title: {postObj.title}</h5>
      <h5>Content: {postObj.content}</h5>
      <h5>Date Posted: {postObj.publication_date}</h5>
      <Button variant="success" className="m-2">Details</Button>
      <Button variant="danger" onClick={deletePost} className="m-2">Delete</Button>
      <Button className="m-2">Edit</Button>
    </Card>
  );
}

DisplayPostCard.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    publication_date: PropTypes.number,
  }).isRequired,
};
