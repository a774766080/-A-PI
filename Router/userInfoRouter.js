const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const userInfoHandler = require('../router-handler/userinfohandler')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user.js')

router.get('/userinfo', userInfoHandler.getUserInfo)

router.post('/userinfo', expressJoi(update_userinfo_schema), userInfoHandler.updateUserInfo)

router.post('/updatepwd', expressJoi(update_password_schema), userInfoHandler.updatePassword)

router.post('/update/avatar', expressJoi(update_avatar_schema), userInfoHandler.updateAvatar)

module.exports = router