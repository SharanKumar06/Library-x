const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    rentPerDay: {
        type: Number,
        required: true,
    },
    totalCopies: {
        type: Number,
        required: true,
    },
    availableCopies: {
        type: Number,
        required: true,
    },
    createdBy:{
        type: String,
        ref: 'User',
        required: true,
    }

},
    {
        timestamps: true,
    }
);

const Book = mongoose.model('Book', bookSchema);