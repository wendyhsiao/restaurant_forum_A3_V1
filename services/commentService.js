const db = require('../models')
const Comment = db.Comment

let commentService = {
  postComment: (req, res, callback) => {
    return Comment.create({
      text: req.body.text,
      RestaurantId: req.body.restaurantId,
      UserId: req.user.id
    })
      .then((restaurant) => {
        callback({ status: 'success', message: '' })
      })
  },
  deleteComment: (req, res, callback) => {
    return Comment.findByPk(req.params.id).then(comment => {
      comment.destroy().then(comment => {
        callback({ status: 'success', message: '', restaurantId: comment.RestaurantId })
      })
    })
  }
}

module.exports = commentService