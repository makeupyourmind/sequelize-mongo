const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Profile = new Schema ({
    id: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    name: {
        type: Schema.Types.String,
    }, 
    phoneNumber: {
        type: String,
        required: [true, 'User phone number required']
    },
    email: {
        type: Schema.Types.String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    bio: {
      type: Schema.Types.String,
    }
})


module.exports = mongoose.model('Profile', Profile);