const { Op } = require("sequelize")
const Trails = require("../models/trails")
const { sequelize } = require("../../sequelize")

exports.getTrailsByPark=async(req,res)=>{
    try{
        console.log("Retrieving Trails By Park")
        const trails = await Trails.findAll({where:{parkId:req.params.parkId}})
        console.log("Trailss Retrieved Successfully")
        res.json(trails)
    }catch(err){
        console.warn("Error Retrieving Trailss: ", err)
        res.json(err)
    }
}

exports.getTrailsById=async(req, res)=>{
    try {
        console.log("Fetching Trail by id.")
        const trail = await Trails.findByPk(req.params.id)
        if(!Trails){
            console.log("Trail not found")
            res.status(404).json("Trail Not Found")
            return
        }
        console.log("Successfully Found Trail")
        res.status(200).json(trail)
    } catch (error) {
        console.warn("ERROR FETCHING Trail BY ID:", error)
        res.status(500).json(error)
    }
}

exports.addTrails = async (req, res)=>{
   try {
    console.log("Creating New Trail")
    let trail = await Trails.findOne({where: {name:{[Op.like]:`${req.body.name}`}, ParkId:`${req.params.id}`}})
    // Check to see if Trails already exists
    if(trail) {
        console.log("Trail is Already in Database")
        res.json("Trail already exists!")
        return
    }
    //Create Trails if one does not exist
    console.log(`Adding ${req.body.name} to the database`)
    trail = await Trails.create({...req.body, ParkId:req.params.id})  
    console.log(`${trail.name} added to database`)  
    res.status(200).json(trail)
   } catch (error) {
    console.warn("Error Creating Trail:", error)   
    res.json(error)
   } 
}

exports.editTrails = async(req, res)=>{
    try {    
        //Search For Trails   
        let trail = await Trails.findByPk(req.params.id)
        //If Trails does not exist
        if(!trail){
            console.log("Trail not found")
            res.status(404).json("Trail Not Found")
            return
        }
        //If Trails does exist       
        console.log(`Modifying ${Trails.name} `)       
        trail = await Trails.update({...req.body})       
        console.log(`${trail.name} successfully updated`)
        res.status(200).json(trail)
    } catch (error) {
        console.warn("ERROR EDITING Trail:",error)
        res.status(500).json("Error Editing Trail")
    }
}

exports.deleteTrails= async(req,res)=>{
    try {
        console.log(`Destroying Trails with id ${req.params.id}`)
        const trail = await Trails.destroy({where:{id:req.params.id}})
        //If Trails does not exist
        if(!trail){
            console.log("Trail not found")
            res.status(404).json("Trail Not Found")
            return
        }
        //If Trails does exist
        res.status(200).json("Successfully Deleted Trail")
    } catch (error) {
        console.warn("ERROR DELETING Trails:", error)
        res.status(500).json(error)
    }
}