import mongoose from 'mongoose';

const partnersCollection = 'partners';

const partnersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    documents: {
        type: [
            {
                name: {
                    type: String
                },
                reference: {
                    type: String
                }
            }
        ],
        default: []
    }
});

export const partnersModel = mongoose.model(partnersCollection, partnersSchema);
