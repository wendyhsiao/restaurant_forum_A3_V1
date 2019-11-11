const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const adminController = require('../controllers/api/adminController.js')

router.get('/admin/restaurants', adminController.getRestaurants)
router.get('/admin/restaurants/:id', adminController.getRestaurant)

module.exports = router