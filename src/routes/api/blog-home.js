/**
 * @description blog 首頁 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')

router.prefix('/api/blog')

// 創建文章
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image })
})

module.exports = router