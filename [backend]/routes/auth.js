const express = require('express')
const passport = require('../utilities/passport/passport')
const { createUser, successfullLogin, failedLogin, signout, deleteUser, getUserById } = require('../utilities/database/controller/users')

const router = express.Router()

router.post('/create', createUser)
router.post('/login', passport.authenticate('local', {successRedirect:'/api/auth/success', failureRedirect:'/api/auth/failure'}))
router.delete('/:id', deleteUser)
router.get('/success', successfullLogin)
router.get('/failure', failedLogin)
router.get('/logout', signout)
router.get('/:id', getUserById)
module.exports = router