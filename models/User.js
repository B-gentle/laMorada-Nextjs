import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'Email already exixts'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    image: {
        type: String
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Apartment'
        }
    ]
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)
export default User;