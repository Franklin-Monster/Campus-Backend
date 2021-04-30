const router = require('koa-router')()
const mysql = require('../mysql/index')

router.get('/', async ctx => {
    // let data = await mysql.delete(["admin_id = 6"], " admin_info")
    // let data = await mysql.insert("5,4,4,4,4", "", "admin_info")
    // let data = await mysql.select("*", "admin_info")
    // let data = await mysql.update("name='fr'", "name='1'", "admin_info")
    const data = await mysql.select("*", "class_group_message")
    ctx.body = data
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

module.exports = router