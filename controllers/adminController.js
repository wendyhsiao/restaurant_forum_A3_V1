const fs = require('fs')
const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({ include: [Category] }).then(restaurants => {
      return res.render('admin/restaurants', { restaurants: restaurants })
    })
  },
  createRestaurant: (req, res) => {
    Category.findAll().then(categories => {
      return res.render('admin/create', { categories: categories })
    })
  },
  postRestaurant: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', '名字不能空白')
      return res.redirect('back')
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
          CategoryId: req.body.categoryId
        }).then(restaurant => {
          req.flash('success_messages', '已成功建立餐廳')
          res.redirect('/admin/restaurants')
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
        CategoryId: req.body.categoryId
      }).then(restaurant => {
        req.flash('success_messages', '已成功建立餐廳')
        res.redirect('/admin/restaurants')
      })
    }
  },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] }).then(restaurant => {
      return res.render('admin/restaurant', { restaurant: restaurant })
    })
  },
  editRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      Category.findAll().then(categories => {
        return res.render('admin/create', { restaurant: restaurant, categories: categories })
      })
    })
  },
  putRestaurant: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', '名字不能空白')
      return res.redirect('back')
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
              CategoryId: req.body.categoryId
            }).then(restaurant => {
              req.flash('success_messages', '餐廳成功更新')
              res.redirect('/admin/restaurants')
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
            CategoryId: req.body.categoryId
          }).then(restaurant => {
            req.flash('success_messages', '餐廳成功更新')
            res.redirect('/admin/restaurants')
          })
        })
    }
  },
  deleteRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant.destroy()
        .then(restaurant => {
          res.redirect('/admin/restaurants')
        })
    })
  },
  editUsers: (req, res) => {
    return User.findAll().then(users => {
      const obj = {
        true: 'admin',
        false: 'user'
      }
      users.forEach(user => {
        user.role = obj[user.isAdmin]
      });
      return res.render('admin/users', { users: users })
    })
  },
  putUsers: (req, res) => {
    return User.findByPk(req.params.id)
      .then(user => {
        console.log('user.isAdmin', user.isAdmin)
        if (user.isAdmin) {
          user.update({
            isAdmin: false
          })
        } else {
          user.update({
            isAdmin: true
          })
        }
      }).then(user => {
        req.flash('success_messages', '使用者權限更新成功')
        res.redirect('/admin/users')
      })
  }
}

module.exports = adminController