import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function DisplayPostCard({ postObj }) {
  return (
    <Card border="light">
      <h5>Title: {postObj.title}</h5>
      <h5>Content: {postObj.content}</h5>
      <h5>Date Posted: {postObj.publication_date}</h5>
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
