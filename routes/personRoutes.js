const express=require('express')
const router=express.Router();

const Person = require('./../models/person');

//POST route to add a person
router.post('/', async(req,res)=>{

    try {
        const data=req.body //Assuming the request body contains the person data 

        // create a new person document using the mongoose model

        const newPerson = new Person(data);

        // save the new person to the database
        const response=await newPerson.save();
        console.log("Data saved successfully");
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})


router.get('/',async(req,res)=>{
    try {
        const data =await Person.find();
        console.log('data fetched successfully')
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//how to get parameterized data
router.get('/:WorkType',async(req,res)=>{
    try {
        const WorkType = req.params.WorkType;
        if(WorkType=='manager' || WorkType=='chef' || WorkType=='waiter')
        {
            const response= await Person.find({work:WorkType})
            console.log("response fetched successfully")
            res.status(200).json(response);
        }
        else
        {
            res.status(404).json({error:'Invalid WorkType'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});   
    }
});

router.put('/:id',async(req,res)=>{
    try {
        const personId= req.params.id; //Extract the id from the URL parameter
        const updatePersonData=req.body; // Update data for the person
        const response =await Person.findByIdAndUpdate(personId, updatePersonData,{
            new: true, // Return the updated document
            runValidators: true,  // Run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'Person deleted successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports=router;