const db = require('../db/index.js')
const path = require('path')

exports.addArticle = (req, res) => {
    // console.log(req.body);
    // console.log('----------------------');
    // console.log(req.file);

    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id
    }

    const sql = 'insert into ev_articles set?'
    db.query(sql, articleInfo, (err, results) => {
        if (err) return res.cc(err)

        if (results.affecteRows === 0) return res.cc('发布文章失败！')

        res.cc('发布文章成功', 0)
    })
}
exports.listArticle = (req, res) => {
    const sql = 'select * from ev_articles where is_delete=0 order by id asc'
    const a = req.query.pagenum - 1
    const b = req.query.pagesize * 1
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        const total = results.length

        const sql = 'select * from ev_articles limit ?,?'
        db.query(sql, [a, b], (err, results) => {
            if (err) return res.cc(err)

            res.send({
                status: 0,
                message: '获取文章成功',
                data: results,
                total
            })
        })

    })
}