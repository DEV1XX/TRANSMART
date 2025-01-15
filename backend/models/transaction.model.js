const mongoose = require('mongoose');

const   TransactionSchema = new mongoose.Schema({
    amount: {
        type:Number,
        required:true
    },
    date: {
        type:Date,
        required:true,
        default: Date.now
    },
    category: {
        type:String,
        required: true,
    },
    description: {
        type : String, 
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User',
        required: true
    }
})

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;