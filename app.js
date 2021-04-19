const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// cors
const cors = require('koa2-cors')

// routes
const index = require('./routes/index')
const users = require('./routes/users')
const message = require('./routes/message')
const list = require('./routes/list')
const card = require('./routes/card')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// 跨域
app.use(
    cors({
        origin: "*",
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']
    })
);

// logger
// app.use(async (ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(message.routes(), message.allowedMethods())
app.use(list.routes(), list.allowedMethods())
app.use(card.routes(), card.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app