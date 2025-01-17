const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type:Number,
        required: true
    },
    date: {
        type:Date,
        required: true,
        default: Date.now,
        index: true
    },
    category: {
        type: String,
        required: true,
        enum: ['food','travel']
    },
    description: {
        type: String,
        trim: true
    },
    paymentMode: {
        type: String,
        enum: ['cash', 'credit card', 'debit card', 'bank transfer'],
        default: 'cash'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Transaction = mongoose.model('Transaction',transactionSchema);
module.exports = Transaction;