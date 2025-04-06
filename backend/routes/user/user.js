const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 

router.get('/blogs/:userId', async (req, res) => {
    const { userId } = req.params;
    try{
        const blogs = await prisma.blog.findMany({
            where: {
                authorId: parseInt(userId)
            },
            select: {
                title: true,
                content: true,
                id: true,
                createdAt: true,
                author: {
                    select: {
                        username: true
                    }
                }
            }
        })

        res.status(201).json({
            blogs
        })
    }catch(err){
        return res.status(500).json({
            message: "Error fetching blogs",
            error: err.message
        })
    }
})

router.get('/mylikes', authMiddleware, async (req, res) => {
    try{
        const likes = await prisma.like.findMany({
            where: {
                userId: req.userId
            },
            include: {
                blog: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        authorId: true,
                        createdAt: true,
                        likeCount: true,
                        author: {
                            select: {
                                id: true,
                                name: true,
                                username: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
            
        })

        res.status(201).json({
            likes
        })
    }catch(err){
        return res.status(500).json({
            message: "Error fetching blogs",
            error: err.message
        })
    }
})

router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try{
        const user = await prisma.user.findFirst({
            where: {
                username: username
            },
            select: {
                name: true,
                username: true,
                id: true,
                email: true,
                blogs: true
            }
        })

        res.status(201).json({
            user: user
        })
    }catch(err){
        res.status(500).json({
            message: "Error fetching the user",
            error: err.message
        })
    }
})

module.exports = router;