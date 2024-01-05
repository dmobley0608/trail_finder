//Imports
const express = require('express')
const path = require('path')

//GLOBAL VARIABLES
const PORT = 5000

//Initiliaze app
const app = express()
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"))

//Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes


//Forward to frontend
app.use('/*', (req,res)=>{
    res.sendFile("index.html", {root: path.join(__dirname,"../build")})
}) 


//Start Server
app.listen(PORT || 5000, ()=>{
    console.log(`Server running on port ${PORT || 5000}`)
})