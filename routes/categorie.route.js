const express = require("express");
const Categorie = require("../models/categorie");
const router=express.Router()


router.get('/', async (req, res )=> {
  try {
        const cat=await Categorie.find()
        return res.status(200).json(cat)
   }
   catch(error){
       res.status(404).json({message:error.message})
   }
})

router.post("/",async(req,res)=>{
const newcategorie=new Categorie(req.body)
try{
      await newcategorie.save()
      res.status(200).json(newcategorie)

}
  catch(error){
    res.status(404).json({message:error})
  }
})


// chercher une catégorie
router.get('/:categorieId',async(req, res)=>{
    try {
    const cat = await Categorie.findById(req.params.categorieId);
    res.status(200).json(cat);
} catch (error) {
    res.status(404).json({ message: error.message })
    }
    })
    

// Supprimer une catégorie
router.delete('/:categorieId', async (req, res)=> {
    const id = req.params.categorieId;
    try{
    await Categorie.findByIdAndDelete(id);
    res.json({ message: "categorie deleted successfully." });
    }
    catch (error){
        res.status(404).json({ message: error.message })  
    }
    });
        


 // modifier une catégorie
router.put('/:categorieId', async (req, res)=> {
    try {
    const cat1 = await Categorie.findByIdAndUpdate(
    req.params.categorieId,
    { $set: req.body },
    { new: true }
    );
    res.status(200).json(cat1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

    
    


module.exports=router