import { Schema, model } from 'mongoose'

const petsCollection = 'pets'

const petSchema = new Schema ({

})

const petModel = model(petsCollection, petSchema)

export {
    petModel
}