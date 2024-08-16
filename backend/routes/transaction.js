const mongoose = require('mongoose');
const express = require('express');

const { authMiddleware } = require('../middleware');
const {Account} = require('../db');

const router = require('express').Router();

router.get('/transfer', authMiddleware, async (req, res) => {

    const session= await mongoose.startSession();

    const {amount, to}= req.body;

    session.startSession();

    const account= await Account.findOne({
        userid: req.id

    }).session(session);

    if (!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount= await Account.findOne({
        userid: to
    }).session(session);

    if (!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    //decreasing and increasing the balance

    await Account.updateOne({
       userid: req.id
    },{
        $inc: {balance: -amount}
    }).session(session);


    await Account.updateOne({
        userid: to
    },{
        $inc: {balance : amount}
    }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
    
})

module.exports= router;