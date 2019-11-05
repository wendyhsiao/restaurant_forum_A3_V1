const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const pageLimit = 10

const restController = {
  getRestaurants: (req, res) => {
    let offset = 0
    let whereQuery = {}
    let categoryId = ''
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery['categoryId'] = categoryId
      console.log('whereQuery', whereQuery)
    }
    Restaurant.findAndCountAll({
      include: Category,
      where: whereQuery,
      offset: offset,
      limit: pageLimit
    }).then(result => {
      let page = Number(req.query.page) || 1
      let pages = Math.ceil(result.count / pageLimit)
      let totalPage = Array.from({ length: pages }).map((item, index) => {
        console.log('item', item)
        return index + 1
      })
      let prev = page - 1 < 1 ? 1 : page - 1
      let next = page + 1 < pages ? pages : page - 1
      console.log('**result**', result.rows)
      const data = result.rows.map(r => ({
        ...r.dataValues, description: r.dataValues.description.substring(0, 50)
      }))
      Category.findAll().then(categories => {
        return res.render('restaurants', {
          restaurants: data,
          categories: categories,
          categoryId: categoryId,
          page: page,
          totalPage: totalPage,
          prev: prev,
          next: next
        })
      })

    })
  },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.body.id, { include: Category })
      .then(restaurant => {
        return res.render('restaurant', { restaurant: restaurant })
      })
  }
}

module.exports = restController