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
  }
}

module.exports = categoryService