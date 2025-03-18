const express = require('express');
const router = express.Router();
const zod = require('zod');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../../middleware/authMiddleware');


const commentPostBody = zod.object({
    comment: zod.string().min(1, "Comment cannot be empty"),
    blogId: zod.number()
})

router.post('/', authMiddleware, async (req, res) => {
    const { success } = commentPostBody.safeParse(req.body)

    if(!success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const { comment, blogId } = req.body;

    try{
        const commentData = await prisma.comment.create({
            data: {
                comment: comment,
                blogId: blogId,
                userId: req.userId
            }
        })

        return res.status(201).json({
            message: "Comment created successfully",
            comment: commentData
        })
    }catch(err){
        return res.status(500).json({
            message: "Error commenting",
            error: err.message
        })
    }
})

router.get('/:id', async (req, res) => {
    const blogId = parseInt(req.params.id)

    if (!blogId) {
        return res.status(400).json({
            message: "Blog ID is required to fetch comments",
        });
    }

    try{
        const comments = await prisma.comment.findMany({
            where: {
                blogId: blogId
            },
            select:{
                comment: true,
                createdAt: true,
                blogId: true,
                userId: true
            }
        })

        res.status(200).json({
            message: "Comments fetched successfully",
            comments
        })
    }catch(err){
        return res.status(500).json({
            message: "Error fetching the comments",
            error: err.message
        })
    }
})

module.exports = router;