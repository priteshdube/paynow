
const express = require('express');
const router = express.Router();

const userRouter= require('./user.js');
const transactionRouter= require('./transaction.js')



router.use('/user', userRouter);
router.use('/transfer', transactionRouter);


module.exports = router;
