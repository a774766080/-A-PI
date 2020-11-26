const express = require('express')
const userRouter = express.Router()

const userHander = require('../router-handler/userhandler.js')

const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user.js')

userRouter.post('/reguser', expressJoi(reg_login_schema), userHander.reguser)

userRouter.post('/login', expressJoi(reg_login_schema), userHander.login)

module.exports = userRouter