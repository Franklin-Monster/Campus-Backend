const router = require('koa-router')()
const mysql = require('../mysql/index')

router.prefix('/card')

// 获取新闻列表
router.get('/getnewslist', async ctx => {
    const data = await mysql.select("title, type", "card_campus_news_list")
    ctx.body = data
})

// 获取校言列表
router.get('/getinvitationlist', async ctx => {
    const data = await mysql.select("*", "card_invitation_list")
    ctx.body = data
})

// 获取校言评论列表
router.get('/getinvitationcomment', async ctx => {
    const data = await mysql.select("*", "card_invitation_comment", null, "order by comment_id desc")
    ctx.body = data
})

// 添加校言评论
router.get('/addinvitationcomment', async ctx => {
    const commentId = await mysql.select("comment_id", "card_invitation_comment", null, 'order by comment_id DESC limit 1')
    const lastCommentId = JSON.parse(JSON.stringify(commentId))[0].comment_id + 1
    const data = await mysql.insert(`${lastCommentId},'天津城建大学','${ctx.request.query.content}','刚刚', 0`,
        "", "card_invitation_comment")
    if (data.affectedRows) {
        ctx.body = 'success'
    } else {
        ctx.body = 'fail'
    }
})

// 获取休闲交友照片
router.get('/getfriendpicture', async ctx => {
    const data = await mysql.select("message_id", "message_friend_list")
    ctx.body = data
})

// 获取 我的课程 课程列表
router.get('/getmycourselist', async ctx => {
    const data = await mysql.select(['name', 'teacher'], "card_course_list")
    ctx.body = data
})

// 获取 我的课程 课程详情
router.get('/getmycoursedetail', async ctx => {
    const data = await mysql.select('*', "card_course_detail")
    ctx.body = data
})

// 获取 我的课程 任务列表
router.get('/getmycoursetasklist', async ctx => {
    const data = await mysql.select('*', "card_course_task_list")
    ctx.body = data
})
module.exports = router