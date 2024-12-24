import { Schema, model } from 'mongoose'

const usersCollection = 'users'

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: Number,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    pets: {
        type: Array,
        default: []
    }
});

const userModel = model( usersCollection, userSchema )

export {
    userModel
}