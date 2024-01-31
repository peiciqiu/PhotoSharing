// import Users from './user/pages/Users';
// import React from 'react';

// import UsersList from '../components/UsersList';

// const Users = () => {
//     const USERS = [
//     {id: 'u1', 
//     name:'lin', 
//     image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fres.klook.com%2Fimage%2Fupload%2FMobile%2FCity%2Fswox6wjsl5ndvkv5jvum.jpg&tbnid=qWJtNgw_RK6NxM&vet=12ahUKEwiLjMLX4dGDAxVBXvUHHdc7AmkQMygBegQIARBz..i&imgrefurl=https%3A%2F%2Fwww.klook.com%2Fen-HK%2Fcity%2F107-paris-things-to-do%2F&docid=D4g1kiqpI4EyMM&w=5368&h=3020&q=paris&ved=2ahUKEwiLjMLX4dGDAxVBXvUHHdc7AmkQMygBegQIARBz', 
//     places:3
//     }
// ];
//     return <UsersList items={USERS} />;
// };

// export default Users;


import React, { useEffect, useState }from 'react';

import UsersList from '../components/UsersList';

import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const[error, setError] = useState();
  const[loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/users');
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
  
        setLoadedUsers(responseData.users);
        
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };
  // const USERS = [
  //   {
  //     id: 'u1',
  //     username: 'Max Schwarz',
  //     image:
  //       'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     places: 3
  //   }
  // ];


  return (
  <React.Fragment>
    <ErrorModal error={error} onClear={errorHandler} />
    {isLoading && (
      <div className='center'>
        <LoadingSpinner />
      </div>
    )}
    {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;