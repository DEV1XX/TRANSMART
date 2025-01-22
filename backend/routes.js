const express = require('express');
const router = express.Router();

//IMPORTING CONTROLLERS 
const {signup, login, logout} = require('./controllers/AuthControllers');
const {addTransaction, deleteTransaction, getAllTransactions, addCategory, deleteCategory ,testapi } = require('./controllers/FeatureControllers');

//IMPORTING MIDDLEWARES
const { authenticate } = require('./middlewares/authenticate')

//testing api
router.get('/',testapi)

//AUTH ROUTES
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authenticate, logout); //protected route 

//TRANSACTION ROUTES
router.post('/transactions', authenticate, addTransaction);
router.delete('/transactions/:transactionId', authenticate, deleteTransaction);
router.get('/transactions', authenticate, getAllTransactions); // Get all transactions

//CATEGORY ROUTES
router.post('/categories', authenticate, addCategory); // Get all transactions
router.delete('/categories/:categoryName', authenticate, deleteCategory); // Delete custom category

module.exports = router;