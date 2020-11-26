const joi = require('@hapi/joi')
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const avatar = joi.string().dataUri().required()

exports.reg_login_schema = {
    body: {
        username,
        password
    }
}
exports.update_userinfo_schema = {
    body: {
        username,
        id,
        nickname,
        email
    }
}
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password), // 除了不能和旧密码一致，还必须符合password的验证规则
        rePwd: joi.not(joi.ref('oldPwd')).concat(password) // 除了不能和旧密码一致，还必须符合password的验证规则
    }
}
exports.update_avatar_schema = {
    body: {
        avatar
    }
}