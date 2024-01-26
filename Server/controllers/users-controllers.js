const uuid = require('uuid/v4');
const HttpError = require('../Models/http-error');
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

const signup = (req, res, next) => {
    const {username, email, password} = req.body;

    const hasUser = DUMMY_USER.find(u => u.email === email); 
    if (hasUser) {
        throw new HttpError('Could not create user, email already exists', 422);
    }

    const createdUser = {
        id: uuid(),
        username,
        email,
        password
    };

    DUMMY_USER.push(createdUser);
    res.status(201).json({user: createdUser});
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
