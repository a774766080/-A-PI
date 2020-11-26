const db = require('../db/index.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config.js')

exports.reguser = (req, res) => {
    const userinfo = req.body
        // if (!userinfo.username || !userinfo.password) {
        //     // return res.send({ status: 1, message: '用户名或密码不能为空' })
        //     return res.cc('用户名或密码不能为空')
        // }

    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        // if (err) return res.send({ status: 1, message: err.message })
        if (err) return res.cc(err)

        // if (result.length !== 0) return res.send({ status: 1, message: '用户名已被占用，请更换' })
        if (results.length !== 0) return res.cc('用户名已被占用，请更换')

        //加密密码
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            // if (err) return res.send({ status: 1, message: err.message })
            if (err) return res.cc(err)

            // if (results.affectedRows !== 1) return res.send({ status: 1, message: '用户注册失败' })
            if (results.affectedRows !== 1) return res.cc('用户注册失败')

            // res.send({ status: 0, message: '用户注册成功' })
            res.cc('用户注册成功', 0)
        })
    })
}
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)

        if (results.length === 0) return res.cc('用户不存在')

        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('登录失败')

        const user = {...results[0], password: '', user_pic: '' }

        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({
            status: 0,
            message: '登录成功!',
            token: 'Bearer ' + tokenStr
        })
    })
}