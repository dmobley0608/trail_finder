const express = require('express')
const { getParkReviewsByPark, getParkReviewsById, addParkReview, editParkReview, deleteParkReview } = require('../utilities/database/controller/parkReview')
const { checkedLoggedIn } = require('../utilities/database/controller/users')



const router = express.Router()

router.get('/:parkId', getParkReviewsByPark)
router.get('/:id', getParkReviewsById)
router.post('/:id', checkedLoggedIn, addParkReview)
router.put('/:id', checkedLoggedIn, editParkReview)
router.delete('/:id', checkedLoggedIn, deleteParkReview)
module.exports = router