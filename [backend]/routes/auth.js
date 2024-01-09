const express = require('express')
const passport = require('../utilities/passport/passport')
const { createUser, successfullLogin, failedLogin, signout, deleteUser, getUserById, getCurrentUser } = require('../utilities/database/controller/users')

const router = express.Router()

router.post('/create', createUser, passport.authenticate('local', {successRedirect:'/api/auth/success', failureRedirect:'/api/auth/failure'}))
router.post('/login', passport.authenticate('local', {successRedirect:'/api/auth/success', failureRedirect:'/api/auth/failure'}))
router.delete('/:id', deleteUser)
router.get('/success', successfullLogin)
router.get('/failure', failedLogin)
router.get('/logout', signout)
router.get('/:id', getUserById)
router.get('/', getCurrentUser)
module.exports = router