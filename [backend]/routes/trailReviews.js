const express = require('express');
const { getTrailReviewsByTrail, getTrailReviewsById, editTrailReview, addTrailReview, deleteTrailReview } = require('../utilities/database/controller/trailReview');

const router = express.Router();

router.get('/:trailId', getTrailReviewsByTrail)
router.get('/:id', getTrailReviewsById)
router.put('/:id', editTrailReview)
router.post('/:id', addTrailReview)
router.delete('/:id', deleteTrailReview)

module.exports = router