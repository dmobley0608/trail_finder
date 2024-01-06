const express = require('express')
const { getAllParks, addPark, getParkById, editPark, deletePark } = require('../utilities/database/controller/parks')

const router = express.Router()

router.get('/', getAllParks)
router.get('/:id', getParkById)
router.post('/', addPark)
router.put('/:id', editPark)
router.delete('/:id', deletePark)
module.exports = router