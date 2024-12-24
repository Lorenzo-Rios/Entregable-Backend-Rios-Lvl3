import { Schema, model } from 'mongoose'

const petsCollection = 'pets'

const petSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    date: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const petModel = model(petsCollection, petSchema)

export {
    petModel
}