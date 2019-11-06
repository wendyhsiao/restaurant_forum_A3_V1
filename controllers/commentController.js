const db = require('../models')
const Comment = db.Comment

let commentController = {
  postComment: (req, res) => {
    return Comment.create({
      text: req.body.text,
      RestaurantId: req.body.restaurantId,
      UserId: req.user.id
    })
      .then((restaurant) => {
        console.log('req.body.restaurantId', req.body.restaurantId)
        return res.redirect(`/restaurants/${req.body.restaurantId}`)
      })
  }
}

module.exports = commentController