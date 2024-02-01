import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';
// import Button from '../../shared/components/FormElements/Button';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

// const DUMMY_PLACES = [
//   {
//     id: 'p1',
//     title: 'Empire State Building',
//     description: 'One of the most famous sky scrapers in the world!',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//     address: '20 W 34th St, New York, NY 10001',
//     location: {
//       lat: 40.7484405,
//       lng: -73.9878584
//     },
//     creator: 'u1'
//   },
//   {
//     id: 'p2',
//     title: 'Emp. State Building',
//     description: 'One of the most famous sky scrapers in the world!',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//     address: '20 W 34th St, New York, NY 10001',
//     location: {
//       lat: 40.7484405,
//       lng: -73.9878584
//     },
//     creator: 'u2'
//   }
// ];

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError} = useHttpClient();

  const userId = useParams().userId;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:3000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      } catch (err) {} 
    };
    fetchPlaces();

  }, [sendRequest, userId]);


  // const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

  // useParams();

  return (
  <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && (
      <div className="center">
        <LoadingSpinner />
      </div>
    )}
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
  </React.Fragment>
  );
};

export default UserPlaces;