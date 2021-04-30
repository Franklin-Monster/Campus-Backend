const router = require('koa-router')()
const mysql = require('../mysql/index')

router.prefix('/message')

// 获取好友信息
router.get('/getfriendmessage', async ctx => {
    const data = await mysql.select("*", "message_friend_list")
    ctx.body = data
})

// 获取课程群消息
router.get('/getclassgroupmessage', async ctx => {
    const data = await mysql.select("*", "message_class_group")
    ctx.body = data
})

module.exports = router