import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    property: {type: mongoose.Schema.Types.ObjectId, ref: 'Property'}
})

const reviewModel = mongoose.model('Review', ReviewSchema);

export default reviewModel;