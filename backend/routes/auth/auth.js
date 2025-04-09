const express = require('express')
const router = express.Router()
const zod = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../../middleware/authMiddleware');
const prisma = new PrismaClient();

const singupBody = zod.object({
    name: zod.string(),
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
})

router.post('/signup', async (req, res) => {
    const { success, error } = singupBody.safeParse(req.body)

    if(!success){
        return res.status(400).json({
            message: "Incorrect inputs",
            error
        })
    }

    const { name, username, email, password } = req.body;

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                {email: email},
                {username: username}
            ]
        }
    }) 

    if(existingUser){
        res.status(409).json({
            message: "Email or username already exists"
        })
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: name,
                email : email,
                username : username,
                password : hashedPassword
            }
        })

        const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET)

        return res.status(201).json({
            token,
            message: "Signup successful"
        })
    }catch(err){
        return res.status(500).json({
            message: "Error creating user", 
            error: err.message
        })
    }
})


const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if(!success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const { email, password } = req.body;

    try{
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(403).json({
                message: "Incorrect password"
            })
        }

        const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET);

        return res.status(201).json({
            token,
            message: "Signin successful"
        })
    }catch(err){
        return res.status(500).json({
            message: "Error signing user", 
            error: err.message
        })
    }
})

router.get("/user/profile", authMiddleware, async (req, res) => {
    
    try{
        const user = await prisma.user.findFirst({
            where: {
                id: req.userId
            },
            select: {
                name: true,
                username: true,
                id: true,
                email: true,
                blogs: true,
                likes: true
            }
        })

        res.status(201).json({
            user: user
        })
    }catch(err){
        return res.status(500).json({
            message: "Error fetching user", 
            error: err.message
        })
    }
})

router.get("/user/:id", async (req, res) => {
    
    try{
        const user = await prisma.user.findFirst({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                username: true
            }
        })

        res.status(201).json({
            user: user
        })
    }catch(err){
        return res.status(500).json({
            message: "Error fetching user", 
            error: err.message
        })
    }
})

module.exports = router