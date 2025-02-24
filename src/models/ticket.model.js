import { Schema, model } from 'mongoose';

const ticketsCollection = 'tickets';

const ticketSchema = new Schema({
  adptionId: {
    type: Schema.Types.ObjectId,
    ref: 'adoptions',
    required: true
  },
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
    },

    adopted_at: {
      type: Date,
      default: Date.now
    }
  }
});

const ticketModel = model(ticketsCollection, ticketSchema);

export { ticketModel };