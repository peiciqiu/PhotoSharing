// const uuid = require('uuid/v4');

// const { validationResult } = require('express-validator');
// const HttpError = require('../Models/http-error');
// // const getCoordsForAddress = require('../util/location');
// const Place = require('../models/place');

// let DUMMY_PLACES = [
//   {
//     id: 'p1',
//     title: 'Empire State Building',
//     description: 'One of the most famous sky scrapers in the world!',
//     location: {
//       lat: 40.7484474,
//       lng: -73.9871516
//     },
//     address: '20 W 34th St, New York, NY 10001',
//     creator: 'u1'
//   }
// ];

// const getPlaceById = async (req, res, next) => {
//   const placeId = req.params.pid; // { pid: 'p1' }

//   let place;
//   try {
//     place = await Place.findById(placeId);
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not find a place', 500
//     );
//     return next(error);
//   } 

//   if (!place || place.length === 0) {
//      const error = new HttpError('Could not find a place for the provided id.', 404);
//      return next(error);
//   }

//   res.json({ place: place.toObject({getters: true}) }); // => { place } => { place: place }
// };

// // function getPlaceById() { ... }
// // const getPlaceById = function() { ... }

// const getPlacesByUserId = async (req, res, next) => {
//   const userId = req.params.uid;

//   let places;

//   try {
//     places = await Place.find({ creator: userId });
//   } catch(err) {
//     const error = new HttpError(
//       'Fetching places failed, please try again later', 500
//     );
//     return next(error);
//   }

//   if (!places || places.length === 0) {
//     return next (new HttpError('Could not find places for the provided user id.', 404));
//   }

//   res.json({ places: places.map(place => place.toObject({ getters: true})) });
// };

// const createPlace = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data', 422)
//   }
//   const { title, description, coordinates, address, creator } = req.body;

//   // const title = req.body.title;
//   // const createdPlace = {
//   //   id: uuid(),
//   //   title,
//   //   description,
//   //   location: coordinates,
//   //   address,
//   //   creator
//   // };

//   // use the schema model
//   const createdPlace = new Place({
//     id: uuid(),
//     title,
//     description,
//     address,
//     location: coordinates,
//     image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.aiseesoft.com%2Fimages%2Ftutorial%2Fjpg-to-url%2Fjpg-to-url.jpg&tbnid=OU9IJj6pSc8HDM&vet=12ahUKEwjx6emcufuDAxXDC1kFHeWMAMMQMygCegQIARBY..i&imgrefurl=https%3A%2F%2Fwww.aiseesoft.com%2Ftutorial%2Fjpg-to-url.html&docid=fvmAGSJ-UfOMbM&w=800&h=345&q=jpg%20url&ved=2ahUKEwjx6emcufuDAxXDC1kFHeWMAMMQMygCegQIARBY',
//     creator
//   });

//   // DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)
//   try{
//     await createdPlace.save();
//   } catch (err) {
//     const error = new HttpError(

//       'Creating place failed, please try again.',
//       500
//     );
//     console.log();
//     return next(error);
//   }
//   res.status(201).json({place: createdPlace});
// };

// const updatePlace = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data', 422)
//   }

//   const { title, description } = req.body;
//   const placeId = req.params.pid;

//   const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId)};
//   const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
//   updatedPlace.title = title;
//   updatedPlace.description = description;

//   DUMMY_PLACES[placeIndex] = updatedPlace;

//   res.status(200).json({place: updatedPlace});
// };

// const deletePlace = (req, res, next) => {
//   const placeId = req.params.pid;
//   if (!DUMMY_PLACES.find(p => p.id === placeId)) {
//     throw new HttpError('Could not find a place for that id', 404);
//   }
//   DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
//   res.status(200).json({ message: 'Deleted place.' });
// };

// exports.getPlaceById = getPlaceById;
// exports.getPlacesByUserId = getPlacesByUserId;
// exports.createPlace = createPlace;
// exports.updatePlace = updatePlace;
// exports.deletePlace = deletePlace;


// const uuid = require('uuid/v4');
// const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');
// const getCoordsForAddress = require('../util/location');
// const Place = require('../models/place');

// let DUMMY_PLACES = [
//   {
//     id: 'p1',
//     title: 'Empire State Building',
//     description: 'One of the most famous sky scrapers in the world!',
//     location: {
//       lat: 40.7484474,
//       lng: -73.9871516
//     },
//     address: '20 W 34th St, New York, NY 10001',
//     creator: 'u1'
//   }
// ];

// const getPlaceById = (req, res, next) => {
//   const placeId = req.params.pid; // { pid: 'p1' }

//   const place = DUMMY_PLACES.find(p => {
//     return p.id === placeId;
//   });

//   if (!place) {
//     throw new HttpError('Could not find a place for the provided id.', 404);
//   }

//   res.json({ place }); // => { place } => { place: place }
// };

// // function getPlaceById() { ... }
// // const getPlaceById = function() { ... }

// const getPlacesByUserId = (req, res, next) => {
//   const userId = req.params.uid;

//   const places = DUMMY_PLACES.filter(p => {
//     return p.creator === userId;
//   });

//   if (!places || places.length === 0) {
//     return next(
//       new HttpError('Could not find places for the provided user id.', 404)
//     );
//   }

//   res.json({ places });
// };

// const createPlace = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError('Invalid inputs passed, please check your data.', 422)
//     );
//   }

//   const { title, description, address, creator } = req.body;

//   let coordinates;
//   try {
//     coordinates = await getCoordsForAddress(address);
//   } catch (error) {
//     return next(error);
//   }

//   // const title = req.body.title;
//   const createdPlace = new Place({
//     id: uuid(),
//     title,
//     description,
//     address,
//     location: coordinates,
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
//     creator
//   });

//   try {
//     await createdPlace.save();
//   } catch (err) {
//     const error = new HttpError(
//       'Creating place failed, please try again.',
//       500
//     );
//     return next(error);
//   }
  
//   res.status(201).json({ place: createdPlace });
// };

// const updatePlace = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data.', 422);
//   }

//   const { title, description } = req.body;
//   const placeId = req.params.pid;

//   const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
//   const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
//   updatedPlace.title = title;
//   updatedPlace.description = description;

//   DUMMY_PLACES[placeIndex] = updatedPlace;

//   res.status(200).json({ place: updatedPlace });
// };

// const deletePlace = (req, res, next) => {
//   const placeId = req.params.pid;
//   if (!DUMMY_PLACES.find(p => p.id === placeId)) {
//     throw new HttpError('Could not find a place for that id.', 404);
//   }
//   DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
//   res.status(200).json({ message: 'Deleted place.' });
// };

// exports.getPlaceById = getPlaceById;
// exports.getPlacesByUserId = getPlacesByUserId;
// exports.createPlace = createPlace;
// exports.updatePlace = updatePlace;
// exports.deletePlace = deletePlace;

const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      'Could not find a place for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) }); // => { place } => { place: place }
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later',
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({ places: places.map(place => place.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  // const title = req.body.title;
  const createdPlace = new Place({
    id: uuid(),
    title,
    description,
    address,
    location: coordinates,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
    creator
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

// const deletePlace = async (req, res, next) => {
//   const placeId = req.params.pid;

//   let place;
//   try {
//     place = await Place.findById(placeId);
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not delete place.',
//       500
//     );
//     return next(error);
//   }

//   try {
//     await place.remove();
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not delete place.',
//       500
//     );
//     return next(error);
//   }

//   res.status(200).json({ message: 'Deleted place.' });
// };
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  try {
    // Using findByIdAndDelete for direct deletion
    const result = await Place.findByIdAndDelete(placeId);

    // If no document found, send a 404 error
    if (!result) {
      return next(new HttpError('Could not find a place for the provided id.', 404));
    }

    res.status(200).json({ message: 'Deleted place.' });
  } catch (err) {
    const error = new HttpError('Something went wrong, could not delete place.', 500);
    return next(error);
  }
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;