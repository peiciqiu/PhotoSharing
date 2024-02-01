


import React, { useEffect, useState }from 'react';

import UsersList from '../components/UsersList';

import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';

const Users = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const[error, setError] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient(); 
  const[loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const responseData = await sendRequest('http://localhost:3000/api/users');

  
        setLoadedUsers(responseData.users);
        
      } catch (err) {

      }
    };
    fetchUsers();
  }, [sendRequest]);


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
    <ErrorModal error={error} onClear={clearError} />
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