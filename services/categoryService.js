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
  putCategory: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'error', message: 'name didn\'t exist' })
    } else {
      return Category.findByPk(req.params.id)
        .then(category => {
          category.update(req.body)
            .then(category => {
              callback({ status: 'success', message: '已成功修改分類' })
            })
        })
    }
  },
  deleteCategory: (req, res, callback) => {
    return Category.findByPk(req.params.id).then(category => {
      category.destroy().then(category => {
        callback({ status: 'success', message: '' })
      })
    })
  }
}

module.exports = categoryService