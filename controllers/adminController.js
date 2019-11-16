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
    adminService.createRestaurant(req, res, (data) => {
      return res.render('admin/create', data)
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
    adminService.editRestaurant(req, res, data => {
      return res.render('admin/create', data)
    })
  },
  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
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
    adminService.editUsers(req, res, data => {
      return res.render('admin/users', data)
    })
  },
  putUsers: (req, res) => {
    adminService.putUsers(req, res, data => {
      req.flash('success_messages', data['message'])
      res.redirect('/admin/users')
    })
  }
}

module.exports = adminController