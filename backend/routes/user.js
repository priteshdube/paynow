const express = require('express');
const router = express.Router();
const zod = require('zod');
const {User, Account} = require('../db');
const jwt= require('jsonwebtoken')
const secret= require('../config');
const { authMiddleware } = require('../middleware');




//error handling

const errorHandle = (err, req, res, next) => {
    console.error(err)
    res.status(500).send('Something went wrong!')
}

router.use(errorHandle)


//signup end

const signUpSchema= zod.object({
    username: zod.string().email(),
    password: zod.string().regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least one special character"}),
    firstName: zod.string(),
    lastName: zod.string()
})


router.post('/signup', async (req, res) => {

    const {username, password, firstName, lastName} = req.body;

    const  {success} = signUpSchema.safeParse(req.body);

    if (!success){
        return res.status(400).json({
            message: "Invalid input"
        })
    }

    const userExists = await User.findOne({
       username
    })

    if (userExists){
        return res.status(400).json({
            message: "User already exists"
        })
    }
   

    //create new user and balance
    const newUser= await User.create({
        username,
        password,
        firstName,
        lastName
    })

    const id= newUser._id;

    await  Account.create({
        userid: id,
        balance: 1+ Math.floor(Math.random()*1000)
    })

    //create token

    const token= jwt.sign({id}, secret)

    res.status(201).json({
        token
    })

})

    //signin end

    const signInSchema= zod.object({
        username: zod.string().email(),
        password: zod.string()
    })

    router.post ('/signin', async (req, res)=>{
        const {username, password}= req.body;   

        const {success}= signInSchema.safeParse(req.body);

        if (!success){
            return res.status(400).json({
                message: "Invalid input"
            })
        }

        const userExists= await User.findOne({
            username,
            password
        })

        if (!userExists){
            return res.status(400).json({
                message: "User does not exist"
            })
        }

        const token= jwt.sign({id: userExists._id}, secret)

        res.status(200).json({
            token
        })


    })

    //update user end

    const updateUserSchema= zod.object({
        password: zod.string().regex(/^(?=.*[!@#$%^&*])/).optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional()

    })

    router.put('/update', authMiddleware, async (req, res)=>{
      


        const {success}= updateUserSchema.safeParse(req.body);

        if (!success){
            return res.status(400).json({
                message: "Invalid input"
            })
        }


        await User.updateOne({
            _id: req.id
        }, req.body)

        res.status(200).json({
            message: "User updated successfully"
        })
    
    })


    //get user end

    router.get('/search', async (req, res)=>{

        const filter = req.query.filter || "";

        const users= await User.find({
            $or: [
                {firstName: {"$regex": filter, "$options": "i"}},
                {lastName: {"$regex": filter, "$options": "i"}}
            ]
        })


        res.status(200).json({
            users
        })
    })


  //get user balance end

  router.get('/balance', authMiddleware, async (req, res)=>{
    const account= await Account.findOne({
        userid: req.id
    })

    res.status(200).json({
        balance: account.balance
    })
  })

module.exports= router;