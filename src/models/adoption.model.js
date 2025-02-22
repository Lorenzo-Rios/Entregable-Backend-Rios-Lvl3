import { Schema, model } from 'mongoose';

const adoptionsCollection = 'adoptions'

const adoptionSchema = new Schema({
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  adopter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  adopted_at: {
    type: Date,
    default: Date.now
  }
})

const adoptionModel = model(adoptionsCollection, adoptionSchema)

export {
  adoptionModel
}