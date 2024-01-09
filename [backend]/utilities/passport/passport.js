const passport = require('passport')
const LOCALSTRATEGY = require('passport-local')
const Users = require('../database/models/users')
const { verifyPassword } = require('../bcrypt')


//LOCAL STRATEGY
passport.use(new LOCALSTRATEGY(
    {usernameField:'email'},
    async(username, password, cb)=>{
    try{
        //Fetch user from database
        const user = await Users.findOne({where:{email:username}})
        //If user is not found
        if(!user) return cb(null, false, {message:'Incorrect username or password'})
        //If user is found verify password
        const userVerified = await verifyPassword(password, user.password)       
        //Password Does Not Match
        if(!userVerified) return cb(null, false, {message:'Incorrect username or password'})
        //Password is verified
        return cb(null, user)
    }catch(err){
        console.log(err)
    }
}))

passport.serializeUser(function (user, cb) {
   
    process.nextTick(() => {
        cb(null, {id:user.id, email:user.dataValues.email, firstName:user.dataValues.firstName, lastName:user.dataValues.lastName, role: user.role })
    })
}); 
passport.deserializeUser(function (user, cb) {  
   
    process.nextTick(() => {
        cb(null, {...user})
    })
})



module.exports = passport