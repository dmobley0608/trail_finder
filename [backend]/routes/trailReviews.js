const express = require('express');
const { getTrailReviewsByTrail, getTrailReviewsById, editTrailReview, addTrailReview, deleteTrailReview } = require('../utilities/database/controller/trailReview');
const { checkedLoggedIn } = require('../utilities/database/controller/users');

const router = express.Router();

router.get('/:trailId', getTrailReviewsByTrail)
router.get('/:id', getTrailReviewsById)
router.put('/:id', checkedLoggedIn, editTrailReview)
router.post('/:id', checkedLoggedIn, addTrailReview)
router.delete('/:id', checkedLoggedIn, deleteTrailReview)

module.exports = router