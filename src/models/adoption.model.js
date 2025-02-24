import { Schema, model } from 'mongoose';

const adoptionsCollection = 'adoptions'

const adoptionSchema = new Schema({ 
  petId: {
    type: Schema.Types.ObjectId,
    ref: 'pets',
    required: true
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
  },

  petData: {
    nombre: {
        type: String
    },
    especie: {
      type: String
    },
    fecha_de_nacimiento: {
        type: String
    }
  }
})

const adoptionModel = model(adoptionsCollection, adoptionSchema)

export {
  adoptionModel
}