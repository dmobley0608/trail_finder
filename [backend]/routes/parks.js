const express = require('express')
const { getAllParks, addPark, getParkById, editPark, deletePark } = require('../utilities/database/controller/parks')
const { checkedLoggedIn } = require('../utilities/database/controller/users')

const router = express.Router()

router.get('/', getAllParks)
router.get('/:id', getParkById)
router.post('/', checkedLoggedIn, addPark)
router.put('/:id', checkedLoggedIn, editPark)
router.delete('/:id',checkedLoggedIn, deletePark)
module.exports = router