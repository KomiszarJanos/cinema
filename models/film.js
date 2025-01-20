const mongoose= require('mongoose');
const filmscheema= new mongoose.Schema(
    {   id: {type:Number, required:true},
        name: {type:String, required:true},
        description: {type:String, required:true},
        image:{type:String, required:true},
        rating:{type:Number, required: true},
        genres: {type:[String], enum:['Crime', 'Drama', 'Action', 'Comedy'],
             required: true},
        inTheaters:{type:Boolean, required:true}

    }
);
module.exports=mongoose.model("Films", filmscheema);
