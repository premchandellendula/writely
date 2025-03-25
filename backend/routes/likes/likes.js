const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

router.post('/like/:blogId', authMiddleware, async (req, res) => {

    try{
        const {blogId} = req.params;
        const userId = req.userId;

        const existingLike = await prisma.like.findFirst({
            where: {
                blogId: parseInt(blogId),
                userId: userId
            }
        })

        let result;

        if(existingLike){
            await prisma.like.delete({
                where: {
                    userId_blogId: {
                        userId: userId,
                        blogId: parseInt(blogId)
                    }
                }
            })

            result = await prisma.blog.update({
                where: {id: parseInt(blogId)},
                data: {
                    likeCount: {decrement: 1}
                }
            })

            res.status(201).json({
                liked: false,
                likeCount: result.likeCount
            })
        }else{
            await prisma.like.create({
                data: {
                    user: { connect : {id: userId}},
                    blog: { connect : {id: parseInt(blogId)}},
                }
            })

            result = await prisma.blog.update({
                where: {id: parseInt(blogId)},
                data: {
                    likeCount: {increment: 1}
                }
            })

            res.status(201).json({
                liked: true,
                likeCount: result.likeCount
            })
        }
    }catch (error) {
        console.error('Like error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
})

router.get('/liked/:blogId', authMiddleware, async (req, res) => {

    const {blogId} = req.params;
    const userId = req.userId;
    try{
        const like = await prisma.like.findFirst({
            where: {
                blogId: parseInt(blogId),
                userId: userId
            }
        })

        return res.status(200).json({
            liked: !!like
        })
    }catch(err){
        console.error('Like Error:', err)
        return res.sendStatus(500).json({
            error: 'Server error'
        })
    }
})

module.exports = router;