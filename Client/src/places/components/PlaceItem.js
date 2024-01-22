// import React from "react";
// import './PlaceItem.css';
// import Card from "../../shared/components/UIElement/Card";

// const PlaceItem = props => {
//     return <li className="place-item">
//         <Card className="place-item__item">
//         <div className="place-item__image">
//             <img src={props.image} alt={props.title}/>
//         </div>
//         <div className="place-item__info">
//             <h2>{props.title}</h2>
//             <h3>{props.address}</h3>
//             <p>{props.description}</p>
//         </div>
//         <div className="place-item__actions">
//             <button>VIEW ON MAP</button>
//             <button>EDIT</button>
//             <button>DELETE</button>
//         </div>
//         </Card>
//     </li>
// };

// export default PlaceItem;

import React, {useState} from 'react';

import Card from '../../shared/components/UIElement/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElement/Modal';

import './PlaceItem.css';

const PlaceItem = props => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <React.Fragment>
        <Modal 
        show={showMap} 
        onCancel={closeMapHandler} 
        header={props.address} 
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        >
            <div className='map-container'></div>
            <h2>THE MAP!</h2>
        </Modal>
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
          <Button to={`/place/${props.id}`}>EDIT</Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
    </React.Fragment>
  );
};

export default PlaceItem;