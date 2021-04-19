const router = require('koa-router')()
const mysql = require('../mysql/index')

router.prefix('/card')

// 获取新闻列表
router.get('/getnewslist', async ctx => {
    let data = await mysql.select("title, type", "card_campus_news_list")
    ctx.body = data
})

// 获取校言列表
router.get('/getinvitationlist', async ctx => {
    let data = await mysql.select("*", "card_invitation_list")
    ctx.body = data
})
module.exports = router