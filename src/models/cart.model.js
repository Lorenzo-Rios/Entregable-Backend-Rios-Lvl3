import { Schema, model } from 'mongoose'

const cartsCollection = 'carts'

const cartSchema = new Schema({
    pets: [
        {
            pet: {
                type: Schema.Types.ObjectId,
                ref: 'pets'
            },
        }
    ]
})

const cartModel = model(cartsCollection, cartSchema)

export {
    cartModel
}
