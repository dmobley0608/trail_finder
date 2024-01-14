const { Op } = require("sequelize")
const Park = require("../models/parks")
const { sequelize } = require("../../sequelize")
const Trails = require("../models/trails")
const ParkReviews = require("../models/parkReview")
const TrailReviews = require("../models/trailReview")
const Users = require("../models/users")

exports.getAllParks = async (req, res) => {
    try {
        console.log("Retrieving Parks")
        const parks = await Park.findAll({ 
            include: [Trails, ParkReviews] 
        })
        console.log("Parks Retrieved Successfully")
        res.json(parks)
    } catch (err) {
        console.warn("Error Retrieving Parks: ", err)
        res.json(err)
    }
}

exports.getParkById = async (req, res) => {
    try {
        console.log(req.params)
        console.log(`Fetching Park ${req.params.id} .`)
        const park = await Park.findByPk(req.params.id,
            {
                include: [
                    {
                        model: Trails,
                        include:TrailReviews
                    },
                    {
                        model:ParkReviews,
                        include:{
                            model:Users,
                            attributes:['firstName', 'lastName']
                        }                     
                    }
                ],
                order:[
                    [{model:Trails}, 'length', 'ASC'],  
                    [{model:ParkReviews},'updatedAt', 'DESC']                 
                ]
            })
        if (!park) {
            console.log("Park not found")
            res.status(404).json("Park Not Found")
            return
        }
        console.log("Successfully Found Park")
        res.status(200).json(park)
    } catch (error) {
        console.warn("ERROR FETCHING PARK BY ID:", error)
        res.status(500).json(error)
    }
}

exports.addPark = async (req, res) => {
    try {
        console.log("Creating New Park")
        let park = await Park.findOne({ where: { name: { [Op.like]: `${req.body.name}` }, state: { [Op.like]: `${req.body.state}` } } })
        // Check to see if park already exists
        if (park) {
            console.log(park)
            console.log("Park is Already in Database")
            res.status(409).json({message:"Park already exists!", park:park})
           
            return
        }
        //remove empty strings
        for(const [key, value] of Object.entries(req.body)){
            if(value === ''){
                req.body[key] = null;
            }
        }
        //Create park if one does not exist
        console.log(`Adding ${req.body.name} to the database`)
        park = await Park.create({ ...req.body, UserId: req.user.id })
        console.log(`${park.name} added to database`)
        res.status(200).json(park)
    } catch (error) {
        console.warn("Error Creating Park:", error)
        res.status(500).json("Error creating park.")
    }
}

exports.editPark = async (req, res) => {
    try {
        //Search For Park   
        let park = await Park.findByPk(req.params.id)
        //If park does not exist
        if (!park) {
            console.log("Park not found")
            res.status(404).json("Park Not Found")
            return
        }
        //If Park does exist       
        console.log(`Modifying ${park.name} `)
        park = await park.update({ ...req.body })
        console.log(`${park.name} successfully updated`)
        res.status(200).json(park)
    } catch (error) {
        console.warn("ERROR EDITING PARK:", error)
        res.status(500).json("Error Editing Park")
    }
}

exports.deletePark = async (req, res) => {
    try {
        console.log(`Destroying park with id ${req.params.id}`)
        const park = await Park.findOne({ where: { id: req.params.id } })
        //If park does not exist
        if (!park) {
            console.log("Park not found")
            res.status(404).json("Park Not Found")
            return
        }
        //If Park does exist
        await park.destroy()
        res.status(200).json("Successfully Deleted Park")
    } catch (error) {
        console.warn("ERROR DELETING PARK:", error)
        res.status(500).json(error)
    }
}