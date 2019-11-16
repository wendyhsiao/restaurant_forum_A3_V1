const fs = require('fs')
const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({ include: [Category] })
      .then(restaurants => {
        callback({ restaurants: restaurants })
      })
  },
  createRestaurant: (req, res, callback) => {
    Category.findAll().then(categories => {
      callback({ categories: categories })
    })
  },
  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] })
      .then(restaurant => {
        callback({ restaurant: restaurant })
      })
  },
  editRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      Category.findAll().then(categories => {
        callback({ restaurant: restaurant, categories: categories })
      })
    })
  },
  postRestaurant: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'error', message: "名字不能空白" })
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: file ? img.data.link : null,
          CategoryId: req.body.categoryId,
          viewCounts: 0
        }).then(restaurant => {
          callback({
            status: 'success', message: '已成功建立餐廳'
          })
        })
      })
    } else {
      return Restaurant.create({
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        opening_hours: req.body.opening_hours,
        description: req.body.description,
        image: null,
        CategoryId: req.body.categoryId,
        viewCounts: 0
      }).then(restaurant => {
        callback({ status: 'success', message: '已成功建立餐廳' })
      })
    }
  },
  putRestaurant: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'error', message: '名字不能空白' })
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Restaurant.findByPk(req.params.id)
          .then(restaurant => {
            restaurant.update({
              name: req.body.name,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: file ? img.data.link : restaurant.image,
              CategoryId: req.body.categoryId,
              viewCounts: restaurant.viewCounts
            }).then(restaurant => {
              callback({ status: 'success', message: '餐廳成功更新' })
            })
          })
      })
    } else {
      return Restaurant.findByPk(req.params.id)
        .then(restaurant => {
          restaurant.update({
            name: req.body.name,
            tel: req.body.tel,
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            description: req.body.description,
            image: restaurant.image,
            CategoryId: req.body.categoryId,
            viewCounts: restaurant.viewCounts
          }).then(restaurant => {
            callback({ status: 'success', message: '餐廳成功更新' })
          })
        })
    }
  },
  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        restaurant.destroy()
          .then(restaurant => {
            res.json({ status: 'success', message: '' })
          })
      })
  },
}
module.exports = adminService