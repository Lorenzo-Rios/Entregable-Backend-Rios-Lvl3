import { Schema, model } from 'mongoose';

const ticketsCollection = 'tickets';

const ticketSchema = new Schema({
    adoptionId: {
        type: Schema.Types.ObjectId,
        ref: 'adoptions'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        nombre: {
            type: String
        },
        direccion: {
            type: String
        },
        telefono: {
            type: Number
        },
    },
    cart: {
        pets: [
            {
                nombre: {
                    type: String
                },
                especie: {
                    type: String
                },
                edad: {
                    type: Number
                },
            },
        ]
    },
});

const ticketModel = model(ticketsCollection, ticketSchema);

export { ticketModel };