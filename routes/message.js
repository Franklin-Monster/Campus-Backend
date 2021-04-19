const router = require('koa-router')()
const mysql = require('../mysql/index')

router.prefix('/message')

router.get('/getclassgroupmessage', async ctx => {
    let data = await mysql.select("*", "class_group_message")
    ctx.body = data
})

module.exports = router