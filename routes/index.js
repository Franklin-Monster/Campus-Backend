const router = require('koa-router')()
const mysql = require('../mysql/index')

router.get('/', async (ctx, next) => {
    // let data = await mysql.delete(["school_id = 1"], " admin_info")
    let data = await mysql.update("name = 1", "name='张老师'", "admin_info")
    ctx.body = data
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

module.exports = router