const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const User = new Schema ({
    id: Schema.Types.ObjectId,
    name: {
        type: Schema.Types.String,
        unique: true,
    }, 
    test: Schema.Types.String,
    phoneNumber: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    email: {
        type: Schema.Types.String,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
})


module.exports = mongoose.model('User', User);