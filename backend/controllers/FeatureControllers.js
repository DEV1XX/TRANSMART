const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
require('dotenv').config();

//ADD TRANSACTION 
const addTransaction = async (req,res) => {
    const {amount, category, description, paymentMode} = req.body;
    if(!amount || !category || !req.userId){
        return res.status(400).json({ success: false, message: "Amount, category, and user ID are required!" });
    }
    try{
        const transaction = await Transaction.create({
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description,
            paymentMode,
            userId: req.user.userId
        })
        res.status(201).json({ success: true, message: 'Transaction added successfully', transaction });
    }catch(error){
        res.status(400).json({ success: false, message: 'Error adding transaction: ' + error.message });
    }
}

//DELETE TRANSACTION
const deleteTransaction = async (req,res) => {
    const { transactionId } = req.params;
    try {
        const transaction = await Transaction.findOne({_id: transactionId, userId: req.user._id});
        if(!transaction){
            return res.status(404).json({success:false, message:"Transaction not found or Unauthorised!"});
        }
        await transaction.remove();
        return res.status(200).json({ success: true, message: "Transaction deleted successfully" });
    } catch (error) {
        return res.status(500).json({success: false,message: "Transaction delete failed!"});
    }
}

//GET ALL TRANSACTIONS 
const getAllTransactions = async (req,res) => {
try {
    const transactions = await Transaction.find({ userId: req.user._id });
    return res.status(200).json({ success: true, transactions });
} catch (error) {
    console.error(error);
    return res.status(500).json({success: false, message: "Error retrieving transactions"});
}
}

//ADD CUSTOM CATEGORY
const addCategory = async (req,res) => {
    //get category from request
    const {category} = req.body;
    //if category not present throw error
    if(!category){
        return res.status(400).json({success: false,message: "Category name is required!"});
    }
    try {       
        //find user 
        const user = await User.findById(req.user._id);
        //if user not found throw error 
        if(!user) return res.status(404).json({success: false, message: "User not found!"});
        //push the category if user doesnt already have the category
        if(!user.categories.includes(category)){
            user.categories.push(category);
            await user.save();
            return res.status(200).json({success: true, message: "Category added successfully"});
        } else{
            return res.status(400).json({success: true, message: "Category already exists"});
        }  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error adding category: " + error.message });
    }
}

//DELETE CUSTOM CATEGORY
const deleteCategory = async (req,res) => {
        //get category from request
        const {categoryName} = req.params;
        //if category not present throw error
        if(!categoryName){
            return res.status(400).json({success: false,message: "Category name is required!"});
        }
        try {
        const user = await User.findById(req.user._id);
        //if user not found throw error 
        if(!user) return res.status(404).json({success: false, message: "User not found!"});
        // Check if the category exists before removing
        const categoryIndex = user.categories.indexOf(categoryName);
        if (categoryIndex === -1) {
            return res.status(400).json({ success: false, message: "Category not found" });
        }
        // Remove the category
        user.categories.splice(categoryIndex, 1);
        await user.save();

        return res.status(200).json({ success: true, message: "Category deleted successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error deleting category: " + error.message }); 
        }
}

//API TESTING
const testapi = (req,res) => {
    res.send("yo yo honey singh");
}

module.exports = {addTransaction, deleteTransaction, getAllTransactions, addCategory, deleteCategory, testapi}