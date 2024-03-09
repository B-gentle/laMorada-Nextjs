import mongoose from "mongoose";

const ApartmentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    description: [
        {
            type: String,
            ref: 'Apartment'
        }
    ]
}, {
    timestamps: true
})

const Apartment = mongoose.model('Apartment', ApartmentSchema)
export default Apartment;