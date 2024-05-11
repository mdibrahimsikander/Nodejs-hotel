const express = require('express');
const router= express.Router();

const menu= require('./../models/menu');

router.post("/", async (req, res) => {
    try {
      const menuItemData = req.body;
      // Create a new menu item using the Mongoose model
      const menuItem = new menu(menuItemData);
      // Save the new menu item to the database
      const menu_data = await menuItem.save();
      console.log("Menu item saved");
      res.status(201).json(menu_data);
    } catch (error) {
      console.error("Error creating menu item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get('/', async (req, res) =>{
      try {
          const menuItems = await menu.find();
          res.json(menuItems);
      } catch (error) {
          console.log("Error fetching menu item:", error);
          res.status(500).json({ error: "Internal server error" });
      }
  });

  router.get('/:TasteType', async (req, res) =>{
    try {
        const TasteType= req.params.TasteType;
        if(TasteType=='sweet' || TasteType=='spicy' || TasteType=='sour'){
            const response=await menu.find({taste:TasteType})
            console.log("Response fetched successfully");   
            res.status(200).json(response);       
        }
        else
        {
            res.status(404).json({error:'Invalid TasteType'});
        }
    } catch (error) {
        console.log("Error fetching menu item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
  })

  router.put('/:id',async(req,res) => {
    try {
        const menuId=req.params.id;
        const updateMenuData = req.body;
        const response=await menu.findByIdAndUpdate(menuId,updateMenuData,{new:true,runValidators:true});
        if(!response){
            return res.status(404).json({error:'Menu item not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
  })

  router.delete('/:id',async(req,res)=>{
    try {
        const menuId=req.params.id;
        const response=await menu.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error:'Menu item not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:"menu deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
  })

  module.exports=router;