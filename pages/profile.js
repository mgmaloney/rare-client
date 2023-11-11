import { useEffect, useState } from 'react';
import UserCard from '../components/user';
import { getSingleUser } from '../utils/userData';

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem('auth_token');
    getSingleUser(userId).then((userDb) => {
      setUser(userDb);
    });
  }, []);
  return (
    <UserCard userObj={user} />
  );
}

export default Profile;
