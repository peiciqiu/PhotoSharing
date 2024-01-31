// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     name: {type: String, required: true},
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true, minlength: 6 },
//     image: {type: String, required: true},
//     places: { type: String, required: true}
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function(email) {
                const user = await this.constructor.findOne({ email });
                if(user) {
                    if(this.id === user.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            message: 'The specified email address is already in use.'
        }
    },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place'} ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
