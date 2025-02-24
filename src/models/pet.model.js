import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const petsCollection = 'pets';

const petSchema = new Schema({
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
    },
    status: {
        type: String,
        enum: ['Disponible', 'En pedido de adopción', 'Adoptado'],
        default: 'Disponible'
    }
});

petSchema.plugin(mongoosePaginate);

const petModel = model(petsCollection, petSchema);

export { petModel };