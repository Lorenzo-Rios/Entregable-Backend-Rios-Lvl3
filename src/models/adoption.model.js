import { Schema, model } from 'mongoose';

const adoptionsCollection = 'adoptions'

const adoptionSchema = new Schema({ 
  cart: {
    pets: [
      {
        pet: {
          type: Schema.Types.ObjectId,
          ref: 'pets',
          required: true
        }
      }
    ]
  },
  adopterId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  adopted_at: {
    type: Date,
    default: Date.now
  },
  
  status: {
    type: String,
    enum: ['Pendiente', 'Aceptado', 'Rechazado'],
    default: 'Pendiente'
  },

  adopterData: {
    nombre: {
        type: String
    },

    direccion: {
        type: String
    },

    telefono: {
        type: Number
    }
  }
})

const adoptionModel = model(adoptionsCollection, adoptionSchema)

export {
  adoptionModel
}