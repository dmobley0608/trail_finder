//Imports
const express = require('express')
require('dotenv').config()
const path = require('path')
const { connectToDatabase } = require('./utilities/sequelize')
const session = require('express-session')
const passport = require('./utilities/passport/passport')
const ParkRouter = require('./routes/parks')
const TrailRouter = require('./routes/trails')
const ParkReviewRouter = require('./routes/parkReviews')
const TrailReviewRouter = require('./routes/trailReviews')
const AuthRouter = require('./routes/auth')

//GLOBAL VARIABLES
const PORT = 5000

//Initiliaze app
const app = express()
app.use(express.static(path.join(__dirname, "..", "build"))) 
app.use(express.static("public"))

//Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Session Management
app.use(session({
    store: new (require('connect-pg-simple')(session))({
        conString: process.env.DATABASE_CONNECTION_STRING,
        tableName: 'session'
    }),   
    secret: 'temp-secret',
    resave: false, 
    saveUninitialized: false,    
    sameSite:"none",
    cookie: {
        maxAge: 86400000,
        secure: false,  
        httpOnly:true     
    }
}))
app.use(passport.initialize())
app.use(passport.authenticate('session')) 

//Connect to database
connectToDatabase()

//Routes
app.use('/api/parks', ParkRouter )
app.use('/api/trails', TrailRouter)
app.use('/api/park-reviews', ParkReviewRouter)
app.use('/api/trail-reviews', TrailReviewRouter)
app.use('/api/auth', AuthRouter)
//Forward to frontend
app.use('/*', (req,res)=>{
    res.sendFile("index.html", {root: path.join(__dirname,"../build")})
}) 


//Start Server
app.listen(PORT || 5000, ()=>{
    console.log(`Server running on port ${PORT || 5000}`)
}) 