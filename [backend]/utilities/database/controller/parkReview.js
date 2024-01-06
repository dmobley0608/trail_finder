const { Op } = require("sequelize")
const ParkReviews = require("../models/parkReview")
const { sequelize } = require("../../sequelize")

exports.getParkReviewsByPark=async(req,res)=>{
    try{
        console.log("Retrieving Reviews By Park")
        const reviews = await ParkReviews.findAll({where:{parkId:req.params.parkId}})
        console.log("Park Reviews Retrieved Successfully")
        res.json(reviews)
    }catch(err){
        console.warn("Error Retrieving Park Reviews: ", err)
        res.json(err)
    }
}

exports.getParkReviewsById=async(req, res)=>{
    try {
        console.log("Fetching Park Review by id.")
        const review = await ParkReviews.findByPk(req.params.id)
        if(!review){
            console.log("Park Review not found")
            res.status(404).json("Park Review Not Found")
            return
        }
        console.log("Successfully Found Park Review")
        res.status(200).json(review)
    } catch (error) {
        console.warn("ERROR FETCHING Park Review BY ID:", error)
        res.status(500).json(error)
    }
}

exports.addParkReview = async (req, res)=>{
   try {
    console.log("Creating New Park Review")      
    console.log(`Adding ${req.body.name} to the database`)
    let review  = await ParkReviews.create({...req.body, ParkId:req.params.id})  
    console.log(`Park Review added to database`)  
    res.status(200).json(review)
   } catch (error) {
    console.warn("Error Creating Park Review:", error)   
    res.json(error)
   } 
}

exports.editParkReview = async(req, res)=>{
    try {    
        //Search For Park Review  
        let review = await ParkReviews.findByPk(req.params.id)
        //If Review does not exist
        if(!review){
            console.log("Trail not found")
            res.status(404).json("Trail Not Found")
            return
        }
        //If Review does exist       
        console.log(`Modifying ${review.name} `)       
        review = await ParkReviews.update({...req.body})       
        console.log(`${review.name} successfully updated`)
        res.status(200).json(review)
    } catch (error) {
        console.warn("ERROR EDITING Park Review:",error)
        res.status(500).json("Error Editing Park Review")
    }
}

exports.deleteParkReview= async(req,res)=>{
    try {
        console.log(`Destroying Park Review with id ${req.params.id}`)
        const review = await ParkReviews.destroy({where:{id:req.params.id}})
        //If Park Review does not exist
        if(!review){
            console.log("Trail not found")
            res.status(404).json("Trail Not Found")
            return
        }
        //If Review does exist
        res.status(200).json("Successfully Deleted Park Review")
    } catch (error) {
        console.warn("ERROR DELETING Park Review:", error)
        res.status(500).json(error)
    }
}