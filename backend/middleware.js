const express = require('express'); 

const jwt = require('jsonwebtoken');

const secret = require('./config');


const authMiddleware= (req, res, next) => {

    const authHeader= req.headers.authorization;

    if (!authHeader ||!authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded= jwt.verify(token, secret)

        req.id= decoded.id;

        next()
    }
    catch(err){
        return res.status(403).json({
            message: "Unauthorized"
        })
    }

}

module.exports= {
    authMiddleware
}