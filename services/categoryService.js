const db = require('../models')
const Category = db.Category

let categoryService = {
  getCategories: (req, res, callback) => {
    return Category.findAll().then(categories => {
      if (req.params.id) {
        Category.findByPk(req.params.id).then(category => {
          callback({ category: category })
        })
      } else {
        callback({ categories: categories })
      }
    })
  },
  postCategories: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'error', message: 'name didn\'t exist' })
    } else {
      return Category.create({
        name: req.body.name
      }).then(category => {
        callback({ status: 'success', message: '已成功建立分類' })
      })
    }
  },
}

module.exports = categoryService