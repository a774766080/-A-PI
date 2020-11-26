const express = require('express')
const router = express.Router()

const path = require('path')
const expressJoi = require('@escook/express-joi')

const multer = require('multer')
const upload = multer({ dest: path.join(__dirname, '../uploads') })

const artilceHandler = require('../router-handler/articlehandler.js')
const { add_article_schema } = require('../schema/article.js')

router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), artilceHandler.addArticle)

router.get('/list', artilceHandler.listArticle)



module.exports = router