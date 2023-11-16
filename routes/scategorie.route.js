const express = require("express");
const router=express.Router()

const Scategorie = require("../models/scategorie");
router.get('/', async (req, res )=> {
  try {
        const cat=await Scategorie.find()
        return res.status(200).json(cat)
   }
   catch(error){
       res.status(404).json({message:error.message})
   }
})



router.post("/",async(req,res)=>{
const newscategorie=new Scategorie(req.body)
try{
      await newscategorie.save()
      res.status(200).json(newscategorie)

}
  catch(error){
    res.status(404).json({message:error})
  }
})


// chercher une catégorie
router.get('/:scategorieId',async(req, res)=>{
    try {
    const cat = await Scategorie.findById(req.params.scategorieId);
    res.status(200).json(cat);
} catch (error) {
    res.status(404).json({ message: error.message })
    }
    })
    

// Supprimer une catégorie
router.delete('/:scategorieId', async (req, res)=> {
    const id = req.params.scategorieId;
    try{
    await Scategorie.findByIdAndDelete(id);
    res.json({ message: "scategorie deleted successfully." });
    }
    catch (error){
        res.status(404).json({ message: error.message })  
    }
    });
        


 // modifier une catégorie
router.put('/:scategorieId', async (req, res)=> {
    try {
    const cat1 = await Scategorie.findByIdAndUpdate(
    req.params.scategorieId,
    { $set: req.body },
    { new: true }
    );
    res.status(200).json(cat1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

    
    


module.exports=router