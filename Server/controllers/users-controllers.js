const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USER = [
    {
        id: 'u1',
        username: 'Peici Qiu',
        email: 'test@test.com',
        password: 'testers'
    }
];


const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USER})
};

// const signup = async (req, res, next) => {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return next(
//             new HttpError('Invalid inputs passed, please check your data', 422)
//         );
//     }

//     const {username, email, password, places} = req.body;
//     let existingUser
//     try {
//         existingUser = await User.findOne({ email: email })
//     } catch (err) {
//         const error = new HttpError(
//             'Signing up failed, please try again later.', 
//             500
//         );
//         return next(error);
//     }

//     if (existingUser) {
//         const error = new HttpError(
//             'User exists already, please login instead.',
//             422
//         );
//         return next(error);
//     }



//     // const hasUser = DUMMY_USER.find(u => u.email === email); 
//     // if (hasUser) {
//     //     throw new HttpError('Could not create user, email already exists', 422);
//     // }

//     const createdUser = new User({
//         username,
//         email,
//         image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fvetmed.tamu.edu%2Fnews%2Fwp-content%2Fuploads%2Fsites%2F9%2F2023%2F05%2FAdobeStock_472713009.jpeg&tbnid=hjO6hzQMB2oO0M&vet=12ahUKEwjo-YzDs4aEAxUjJGIAHRDvBhEQMygGegQIARB9..i&imgrefurl=https%3A%2F%2Fvetmed.tamu.edu%2Fnews%2Fpet-talk%2Fpuppy-socialization%2F&docid=OAaTH-d9ATRMUM&w=1440&h=1080&q=puppy&ved=2ahUKEwjo-YzDs4aEAxUjJGIAHRDvBhEQMygGegQIARB9',
//         password,
//         places
//     });

//     try {
//         await createdUser.save();
//     } catch (err) {
//         const error = new HttpError(
//           'Signing up failed, please try again.',
//           500
//         );
//         return next(error);
//     }

//     // DUMMY_USER.push(createdUser);

//     res.status(201).json({user: createdUser.toObject({ getters: true })});
// };
const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()); // print the specific validation errors
        return next(
            new HttpError('Invalid inputs passed, please check your data', 422)
        );
    }

    const { username, email, password, places } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return next(
                new HttpError('User exists already, please login instead.', 422)
            );
        }

        const createdUser = new User({
            username,
            email,
            image: 'https://example.com/user-image.jpg', // replace with valid URL
            password,
            places
        });

        await createdUser.save();
        res.status(201).json({ user: createdUser.toObject({ getters: true }) });
    } catch (err) {
        console.error(err); // Log the detailed error
        const error = new HttpError(
            'Signing up failed, please try again.',
            500
        );
        return next(error);
    }
};

const login = (req, res, next) => {
    const { email, password} = req.body;

    const identifiedUser = DUMMY_USER.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password != password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
    }
    res.json({message: 'Logged In'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
