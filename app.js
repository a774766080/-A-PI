const express = require('express')
const app = express()


// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

const cors = require('cors')
app.use(cors())

app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        console.log(err);
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }

    next()
})

const config = require('./config')
const expressJWT = require('express-jwt')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

const joi = require('@hapi/joi')

app.use(express.urlencoded({
    extended: false
}))

const userRouter = require('./Router/userRouter.js')
const userInfoRouter = require('./Router/userInfoRouter.js')
const artCateRouter = require('./Router/artcateRouter.js')
const artilceRouter = require('./Router/articleRouter.js')


app.use('/api', userRouter)
app.use('/my', userInfoRouter)
app.use('/my/article', artCateRouter)
app.use('/my/article', artilceRouter)

app.use((err, req, res, text) => {
    if (err instanceof joi.ValidationError) return res.cc(err)

    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

    res.cc(err) //未知错误
})
app.listen(80, () => {
    console.log('服务器启动成功');
})