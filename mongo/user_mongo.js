const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    id: Schema.Types.ObjectId,
    name: {
        type: Schema.Types.String,
        unique: true,
    }, 
    phoneNumber: {
        type: String,
        required: [true, 'User phone number required']
    },
    email: {
        type: Schema.Types.String,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    bio: {
      type: Schema.Types.String,
    }
})


module.exports = mongoose.model('User', User);