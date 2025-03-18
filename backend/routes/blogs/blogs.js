const express = require('express')
const router = express.Router();
const zod = require('zod')
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../../middleware/authMiddleware');
const prisma = new PrismaClient();

const blogPostBody = zod.object({
    title: zod.string(),
    content: zod.string()
})

router.post('/', authMiddleware, async (req, res) => {
    const { success } = blogPostBody.safeParse(req.body)

    if(!success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const { title, content } = req.body

    try{
        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                authorId: req.userId
            }
        })
        
        return res.status(201).json({
            message: "Blog created successfully",
            blog
        })
    }catch(err){
        return res.status(500).json({
            message: "Error creating blog", 
            error: err.message
        })
    }
})

const blogPutBody = zod.object({
    title: zod.string().optional(),
    content: zod.string().optional()
})

router.put('/:id', authMiddleware, async (req, res) => {
    const { success } = blogPutBody.safeParse(req.body);

    if(!success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const { title, content } = req.body;

    try {
        const blog = await prisma.blog.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                title: title,
                content: content
            }
        })

        return res.status(201).json({
            message: "Blog updated successfully",
            blog
        })
    }catch(err){
        return res.status(500).json({
            message: "Error creating blog", 
            error: err.message
        })
    }
})

router.get('/blog/:id', async (req, res) => {
    try{
        const blog = await prisma.blog.findFirst({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                title: true,
                content: true,
                id: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        res.status(201).json({
            blog
        })
    }catch(err){
        return res.status(500).json({
            message: "Error fetching the blog",
            error: err.message
        })
    }
})

router.get('/blogs', async (req, res) => {
    try{
        const blogs = await prisma.blog.findMany({
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

router.delete('/:id', authMiddleware, async (req, res) => {
    try{
        const blog = await prisma.blog.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(201).json({
            message: "Blog deleted successfully",
            blog
        })
    }catch(err){
        return res.status(500).json({
            message: "Error fetching blogs",
            error: err.message
        })
    }
})


module.exports = router;