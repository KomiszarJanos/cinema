const express= require('express');
const router= express.Router();
const Films= require('../models/film');
	
//createnél
router.post('/films', async(req, res)=> {
    		try {const newFilm= new Films(req.body);
        		       await newFilm.save()
			.then((savedfilm)=>{
            				console.log(savedfilm); 								res.status(201).json({msg:"Contact created"})})
       			 .catch((error)=> { console.log(error);
            			res.status(500).json({msg:"unable to create film"});})
            			} 
    	    catch (error) {console.log(error); res.status(500).json({msg:"Unable create film"})  }
})
	
// get allnál
router.get('/films', async(req, res)=>{
    		try {  Films.find().then(films=>{
	                console.log(films);				
       	            res.status(200).json({films:films}) })
       		.catch((error)=> {console.log(error);
        		res.status(500).json({msg:"unable to get films"}); })
    		}
    	    catch(error)  {console.log(error); res.status(500).json({msg:"Unable to get film"})}
})

//querynél 
router.get('/search', async(req, res)=>{
            try {  const searchTerm=req.query.searchTerm;
                   const searchMongos= new RegExp(searchTerm, "i");
                   await Films.find( {Name:searchMongos}, )
            .then((films)=>{
                if(films.length) {
                    console.log(films);
                    res.status(200).json({films:films});} 
                else {res.status(200).json({films:films, msg:'no match'}); }    
            })  }
        catch(error)
         {console.log(error); res.status(500).json({msg:"No connection"})}
})

//update módosítás put
router.put('/films/:id', async(req, res)=> 	{
            try { const id= req.params.id;
                  const updatefilms=req.body;
                    await Films.findByIdAndUpdate({_id:id}, updatefilms, {new:true})
                        .then(res.status(200).json({msg:"Film updated"}))
                        .catch((error)=> {console.log(error);
                        res.status(500).json({msg:"unable to update film"}); })
                    } 
            catch (error) {console.log(error); res.status(500).json({msg:"Unable to modify film"})  } 
})

//delete
router.delete('/films/:id', async(req, res)=>
    { try { 	const id= req.params.id;
                await Films.findByIdAndDelete({_id:id})
                .then(res.status(200).json({msg:"Film deleted"}))
                .catch((error)=> {console.log(error);
                res.status(500).json({msg:"unable to delete film"});}) } 
      catch (error) {console.log(error); res.status(500).json({msg:"Unable to delete film"}) }
})


module.exports=router;

