const express = require('express')
const { getParkReviewsByPark, getParkReviewsById, addParkReview, editParkReview, deleteParkReview } = require('../utilities/database/controller/parkReview')



const router = express.Router()

router.get('/:parkId', getParkReviewsByPark)
router.get('/:id', getParkReviewsById)
router.post('/:id', addParkReview)
router.put('/:id', editParkReview)
router.delete('/:id', deleteParkReview)
module.exports = router