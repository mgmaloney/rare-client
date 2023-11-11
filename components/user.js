/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function UserCard({ userObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Image style={{ maxWidth: '100px' }} className="card-space" alt="Profile" src={userObj.profile_image_url} />
        <p className="profile-image"> {userObj.first_name}{userObj.last_name}</p>
        <h2 className="nav-text"> Username :{userObj.username} </h2>
        <p className="card-text bold">Email: {userObj.email}</p>
        <p className="card-text bold">Creation Date: {userObj.created_on}</p>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    created_on: PropTypes.number,
    profile_image_url: PropTypes.string,
  }).isRequired,
};

export default UserCard;
