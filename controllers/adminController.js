const fs = require('fs')
const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminService = require('../services/adminService.js')

const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.render('admin/restaurants', data)
    })
  },
  createRestaurant: (req, res) => {
    Category.findAll().then(categories => {
      return res.render('admin/create', { categories: categories })
    })
  },
  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
    })
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
    adminService.putRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurant')
    })
  },
  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, data => {
      console.log('data', data)
      if (data['status'] === 'success') {
        return res.redirect('/admin/restaurants')
      }
    })

    // return Restaurant.findByPk(req.params.id).then(restaurant => {
    //   restaurant.destroy()
    //     .then(restaurant => {
    //       res.redirect('/admin/restaurants')
    //     })
    // })
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
        user.update({
          isAdmin: !user.isAdmin
        })
      }).then(user => {
        req.flash('success_messages', '使用者權限更新成功')
        res.redirect('/admin/users')
      })
  }
}

module.exports = adminController