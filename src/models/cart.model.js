import { Schema, model } from 'mongoose'

const cartsCollection = 'carts'

const cartSchema = new Schema({
    pets: [
        {
            pet: {
                type: Schema.Types.ObjectId,
                ref: 'pets'
            },

            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
})

const cartModel = model(cartsCollection, cartSchema)

export {
    cartModel
}
