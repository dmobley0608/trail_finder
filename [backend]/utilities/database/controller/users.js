const { hashPassword } = require("../../bcrypt")
const ParkReviews = require("../models/parkReview")
const Parks = require("../models/parks")
const { Session } = require("../models/session")
const TrailReviews = require("../models/trailReview")
const Trails = require("../models/trails")
const Users = require("../models/users")

exports.getUserById=async(req,res)=>{
    try {
        const user = await Users.findByPk(req.params.id, 
            {
                attributes:['id', 'firstName', 'lastName', 'email', 'role'],
                include:[Parks, Trails, ParkReviews, TrailReviews]
            })
        res.status(200).json(user)
    } catch (error) {
        console.warn("ERROR FETCHING USER", error)
        res.status(500).json("ERROR FETCHING USER")
    }
}
exports.createUser=async(req, res)=>{
    try {
        const hashedPassword = await hashPassword(req.body.password)       
        const user = await Users.create({...req.body, password:hashedPassword})
        if(!user){
            console.log('ERROR CREATING USER')
            res.status(400).json("ERROR CREATING USER")
            return
        }
        res.status(200).json(user.id)
    } catch (error) {
        console.warn("ERROR CREATING USER", error)
        res.status(500).json('ERROR CREATING USER')
    }
}

exports.deleteUser=async(req,res)=>{
    try {
        const user = await Users.findByPk(req.params.id)
        await user.destroy()
        res.status(200).json("User Successfully Removed")
    } catch (error) {
        console.warn('ERROR DELETING USER', error)
        res.status(500).json('ERROR DELETING USER')   
    }
}

exports.checkedLoggedIn=(req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.status(403).json("You must be logged in to proceed")
    }
}

exports.successfullLogin=async(req,res)=>{
    const user = await Users.findByPk(req.user.id, {attributes:['id', 'firstName', 'lastName', 'email', 'role']});
    res.status(200).json(user)
}

exports.failedLogin=(req,res)=>{
    res.status(400).json("Invalid Username or Password")
}

exports.signout=async(req,res)=>{
    try {        
        //Check to see if user is signed in
        if(!req.user){
            console.log("No user currently signed in")
            res.status(404).json("No user currently logged in")
            return
        }
        //If user is signed in
        console.log(`User ${req.user.id} is signing out.`)
        req.logout(async(err)=>{
            if(err){
                console.log(err)
                return
            }
            await Session.destroy({where:{sid:req.sessionID}})
          
            res.status(200).json("Successfully Signed Out")
        })
       
    } catch (error) {
        console.warn('ERROR LOGGING OUT', error)
        res.status(500).json('ERROR SIGNING OUT')   
    }
}