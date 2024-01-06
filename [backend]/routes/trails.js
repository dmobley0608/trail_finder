const express = require('express')
const { getTrailsById, getTrailsByPark, addTrails, editTrails, deleteTrails } = require('../utilities/database/controller/trails')


const router = express.Router()

router.get('/:parkId', getTrailsByPark)
router.get('/:id', getTrailsById)
router.post('/:id', addTrails)
router.put('/:id', editTrails)
router.delete('/:id', deleteTrails)
module.exports = router