import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

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
    phone: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    pets: [{
        type: Schema.Types.ObjectId,
        ref: 'pets',
        default: []
    }]
});

userSchema.plugin(mongoosePaginate)

const userModel = model( usersCollection, userSchema )

export {
    userModel
}