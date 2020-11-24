// Modules for User model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userAccountModel = mongoose.Schema({
    username:
    {
        type: String,
        defualt: "",
        trim: true,
        required: 'username is required'
    },    
    password: 
    {
        type: String,
        defualt: "",
        trim: true,
        required: 'password is required'
    },
    email:
    {
        type: String,
        defualt: "",
        trim: true,
        required: 'email address is required'
    },
    created:
    {
    type: Date,
    defualt: Date.now
    },
    updated:
    {
    type: Date,
    defualt: Date.now
    },
},
    {
    collection: "UserAccount"
    }
);

//Configure options for User model
let options = ({missingPasswordError: 'Wrong/ Missing Passowrd'});
userAccountModel.plugin(passportLocalMongoose, options);

module.exports.userAccountModel = mongoose.model('UserAccount', userAccountModel);