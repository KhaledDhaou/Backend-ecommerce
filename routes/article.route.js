const express =require("express")
const router =express.Router()
const Article=require("../models/article")

router.get("/",async(req,res)=>{
   try {
       const art=await Article.find().populate("scategorieID")
       res.status(200).json(art)
   } catch (error) {
    res.status(404).json({message:error.message})
   }
})



router.post("/",async(req,res)=>{
const newarticle=new Article(req.body)
    try{
        await newarticle.save()
        res.status(200).json(newarticle)
  }
    catch(error){
      res.status(404).json({message:error})
    }
  })




router.put("/",async(req,res)=>{
try {
    const cat1 = await Article.findByIdAndUpdate(
    req.params.articleId,
    { $set: req.body },
    { new: true }
    );
    res.status(200).json(cat1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    })


// chercher un article
router.get('/:articleId',async(req, res)=>{
    try {
    const cat = await Article.findById(req.params.articleId);
    res.status(200).json(cat);
} catch (error) {
    res.status(404).json({ message: error.message })
    }
    })









router.delete("/",async(req,res)=>{
    const id = req.params.articleId;
    try{
    await Article.findByIdAndDelete(id);
    res.json({ message: "article deleted successfully." });
    }
    catch (error){
        res.status(404).json({ message: error.message })  
    }
    })


module.exports=router