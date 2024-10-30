const mongoose = require('mongoose');

const issueSchema = new mongoose.Scheme({
    book : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    issuedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    returnedDate: {
        type: Date,
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    },
    fine: {
        type: Number,
        default: 0
    }
 
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Issue', issueSchema);