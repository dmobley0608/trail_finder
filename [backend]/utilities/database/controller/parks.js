const { Op } = require("sequelize")
const { sequelize } = require("../../sequelize")
const Park = require("../models/parks")

exports.getAllParks=async(req,res)=>{
    try{
        console.log("Retrieving Parks")
        const parks = await Park.findAll()
        console.log("Parks Retrieved Successfully")
        res.json(parks)
    }catch(err){
        console.log("Error Retrieving Parks")
        res.json(err)
    }
}

exports.addPark = async (req, res)=>{
   try {
    let park = await Park.findOne({where: {name:{[Op.like]:`${req.body.name}`}, state:{[Op.like]:`${req.body.state}`} }})
    // Check to see if park already exists
    if(park) {
        res.json("Park already exists!")
        return
    }
    console.log(`Adding ${req.body.name} to the database`)
    park = await Park.create({...req.body})  
    console.log(`${park.name} added to database`)  
    res.json(park)
   } catch (error) {
    console.log("Error Creating Park")   
    res.json(error)
   } 
}