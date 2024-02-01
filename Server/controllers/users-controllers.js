// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/user');



const getUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find({}, '-password'); 
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    }
    // res.json({users: DUMMY_USER})
    res.json({users: users.map(user => user.toObject( {getters: true }))})
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()); // print the specific validation errors
        return next(
            new HttpError('Invalid inputs passed, please check your data', 422)
        );
    }

    const { username, email, password } = req.body;

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
            places:[]
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

const login = async (req, res, next) => {
    const { email, password} = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            401
        );
        return next(error);
    }

    res.json({message: 'Logged In', user:  existingUser.toObject({getters: true})});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
