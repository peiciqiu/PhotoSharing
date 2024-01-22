// import React from "react";
// import './UsersList.css';
// import UserItem from "./UserItem";

// const UsersList = props => {
//     if (props.items.length === 0) {
//         return (
//         <div className='center'>
//             <h2>No users found</h2>
//         </div>
//         );
//     }

//     return (
//         <ul className="users.list">
//             {props.items.map(user => (

//                 //pass data into UserItem
//                 <UserItem 
//                     key={user.id} 
//                     id={user.id} 
//                     name={user.name} 
//                     // image={user.image}
//                     placeCount={user.places}
//                 />
//             ))}
//         </ul>
//     );
// };

// export default UsersList;
import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElement/Card';
import './UsersList.css';

const UsersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
        <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;