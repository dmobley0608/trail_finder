const { Op } = require("sequelize")
const TrailReviews = require("../models/trailReview")
const { sequelize } = require("../../sequelize")

exports.getTrailReviewsByTrail=async(req,res)=>{
    try{
        console.log("Retrieving Reviews By Trail")
        const reviews = await TrailReviews.findAll({where:{TrailId:req.params.trailId}})
        console.log("Trail Reviews Retrieved Successfully")
        res.json(reviews)
    }catch(err){
        console.warn("Error Retrieving Trail Reviews: ", err)
        res.json(err)
    }
}

exports.getTrailReviewsById=async(req, res)=>{
    try {
        console.log("Fetching Trail Review by id.")
        const review = await TrailReviews.findByPk(req.params.id)
        if(!review){
            console.log("Trail Review not found")
            res.status(404).json("Trail Review Not Found")
            return
        }
        console.log("Successfully Found Trail Review")
        res.status(200).json(review)
    } catch (error) {
        console.warn("ERROR FETCHING Trail Review BY ID:", error)
        res.status(500).json(error)
    }
}

exports.addTrailReview = async (req, res)=>{
   try {
    console.log("Creating New Trail Review")      
    console.log(`Adding ${req.body.name} to the database`)
    let review  = await TrailReviews.create({...req.body, TrailId:req.params.id})  
    console.log(`Trail Review added to database`)  
    res.status(200).json(review)
   } catch (error) {
    console.warn("Error Creating Trail Review:", error)   
    res.json(error)
   } 
}

exports.editTrailReview = async(req, res)=>{
    try {    
        //Search For Trail Review  
        let review = await TrailReviews.findByPk(req.params.id)
        //If Review does not exist
        if(!review){
            console.log("Trail not found")
            res.status(404).json("Trail Not Found")
            return
        }
        //If Review does exist       
        console.log(`Modifying ${review.name} `)       
        review = await TrailReviews.update({...req.body})       
        console.log(`${review.name} successfully updated`)
        res.status(200).json(review)
    } catch (error) {
        console.warn("ERROR EDITING Trail Review:",error)
        res.status(500).json("Error Editing Trail Review")
    }
}

exports.deleteTrailReview= async(req,res)=>{
    try {
        console.log(`Destroying Trail Review with id ${req.params.id}`)
        const review = await TrailReviews.destroy({where:{id:req.params.id}})
        //If Trail Review does not exist
        if(!review){
            console.log("Trail not found")
            res.status(404).json("Trail Not Found")
            return
        }
        //If Review does exist
        res.status(200).json("Successfully Deleted Trail Review")
    } catch (error) {
        console.warn("ERROR DELETING Trail Review:", error)
        res.status(500).json(error)
    }
}