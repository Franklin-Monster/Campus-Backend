const router = require('koa-router')()
const mysql = require('../mysql/index')

router.prefix('/list')

// 获取教师列表
router.get('/getteacherlist', async ctx => {
    let data = await mysql.select("name, class", "teacher_info")
    ctx.body = data
})

// 获取学生列表
router.get('/getstudentlist', async ctx => {
    let data = await mysql.select("name", "student_info")
    ctx.body = data
})

module.exports = router