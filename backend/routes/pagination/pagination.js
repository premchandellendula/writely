const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/posts', async (req, res) => {
    const { page, limit } = req.query;

    try{
        const posts = await prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc'
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
            },
            skip: (parseInt(page) - 1) * parseInt(limit),
            take: parseInt(limit)
        })

        const totalPosts = await prisma.blog.count();
        const totalPages = Math.ceil(totalPosts / limit);

        res.json({ posts, totalPages });
    }catch(err){
        return res.status(500).json({
            message: "Error fetching blogs",
            error: err.message
        })
    }
})

module.exports = router;