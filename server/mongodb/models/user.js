import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },email: {
        type: String, required: true
    },
    avatar: {
        type: String, required: true
    },
    location: {
        type: String, required: false
    },
    phone: {
        type: String, required: false
    },
    image: {
        type: String, required: false
    },
    // allReviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    allProperties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Property'}],
})

const userModel = mongoose.model('User', UserSchema);

export default userModel;