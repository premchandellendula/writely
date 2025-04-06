const express = require('express')
const router = express.Router()

const authRouter = require('./auth/auth.js');
const blogRouter = require('./blogs/blogs.js');
const commentRouter = require('./comments/comments.js');
const searchRouter = require('./search/search.js');
const paginationRouter = require('./pagination/pagination.js');
const likeRouter = require('./likes/likes.js');
const userRouter = require('./user/user.js')

router.use('/auth', authRouter)
router.use('/blogs', blogRouter)
router.use('/comments', commentRouter)
router.use('/search', searchRouter)
router.use('/pagination', paginationRouter)
router.use('/likes', likeRouter)
router.use('/user', userRouter)

module.exports = router;