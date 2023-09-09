import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // Import Firebase functions

const EditUserPage = () => {
  const { userId } = useParams();
  const userDocRef = doc(db, 'users', userId); // Replace 'db' with your Firestore instance

  const [userInfo, setUserInfo] = useState({
    age: '',
    username: '',
    country: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserInfo({
            age: userData.age || '',
            username: userData.username || '',
            country: userData.country || '',
          });
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [userDocRef]);

  return (
    <div>
      {/* Your edit form */}
      <form>
        <label htmlFor="age">Age:</label>
        <input type="text" id="age" name="age" value={userInfo.age} />

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={userInfo.username} />

        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" value={userInfo.country} />

        {/* Add form submission logic */}
      </form>
    </div>
  );
};

export default EditUserPage;
