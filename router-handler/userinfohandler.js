const db = require('../db/index.js')
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req, res) => {
    const sql = 'select id, username, nickname, email,user_pic from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)

        if (results.length === 0) return res.cc('获取用户信息失败！')
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0]
        })
    })
}

exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')

        return res.cc('修改用户基本信息成功！', 0)
    })
}

exports.updatePassword = (req, res) => {
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('用户不存在！')
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误')

        const sql = 'update ev_users set password=? where id=?'
        if (req.body.newPwd !== req.body.rePwd) return res.cc('两次密码不一致')
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10) //新密码进行加密处理

        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)

            // console.log(results);
            if (results.affectedRows !== 1) return res.cc('修改密码失败')
            res.cc('更新密码成功', 0)
        })
    })
}

exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更新头像失败！')
        return res.cc('更新头像成功', 0)
    })

}