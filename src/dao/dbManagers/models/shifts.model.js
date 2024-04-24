import mongoose from 'mongoose';

const shiftsCollection = 'shifts';

const shiftsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    shift_datetime: {
        type: String,
        required: true
    },
});

export const shiftsModel = mongoose.model(shiftsCollection, shiftsSchema);
