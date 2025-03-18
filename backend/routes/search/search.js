const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const { searchTerm } = req.query;

    try{
        const blogs = await prisma.blog.findMany({
            where: {
                OR: [
                    {title: {contains: searchTerm, mode: 'insensitive'}},
                    {content: {contains: searchTerm, mode: 'insensitive'}},
                ]
            },select: {
                title: true,
                content: true,
                id: true,
                comments: true,
                createdAt: true,
                author: {
                    select: {
                        username: true
                    }
                }
            }
        })

        if (blogs.length === 0) {
            return res.status(404).json({
                message: 'No blogs found matching your search criteria',
            });
        }

        return res.status(201).json({
            message: "Filtered Blogs fetched successfully",
            blogs
        })
    }catch(err){
        return res.status(500).json({
            message: "Error fetching blogs",
            error: err.message
        })
    }
})

module.exports = router;