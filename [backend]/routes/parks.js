const express = require('express')
const { getAllParks, addPark } = require('../utilities/database/controller/parks')

const router = express.Router()

router.get('/', getAllParks)
router.post('/', addPark)
module.exports = router