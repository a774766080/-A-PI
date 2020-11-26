const express = require('express')

const expressJoi = require('@escook/express-joi')

const router = express.Router()

const artcateHandler = require('../router-handler/artcatehandler.js')
const { add_cate_schema, delete_cate_schema, update_cate_schema } = require('../schema/artcate.js')

router.get('/cates', artcateHandler.getArticleCates)

router.post('/addcates', expressJoi(add_cate_schema), artcateHandler.addArticleCates)

router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcateHandler.deleteCateById)

router.get('/cates/:id', expressJoi(delete_cate_schema), artcateHandler.getArticleById)

router.post('/updatecate', expressJoi(update_cate_schema), artcateHandler.updateCateById)


module.exports = router