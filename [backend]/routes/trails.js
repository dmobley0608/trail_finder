const express = require('express')
const { getTrailsById, getTrailsByPark, addTrails, editTrails, deleteTrails } = require('../utilities/database/controller/trails')
const { checkedLoggedIn } = require('../utilities/database/controller/users')


const router = express.Router()

router.get('/:parkId', getTrailsByPark)
router.get('/:id', getTrailsById)
router.post('/:id', checkedLoggedIn, addTrails)
router.put('/:id', checkedLoggedIn, editTrails)
router.delete('/:id', checkedLoggedIn, deleteTrails)
module.exports = router