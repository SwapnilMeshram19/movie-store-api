const {Router}=require("express");
const mongoose=require('mongoose');
const {Schema,model}=mongoose;
const movie=Router();

const MovieSchema=new Schema({
    Title:{
        type:String,
        required:true
    },
    Year:Number,
    Released:String,
    Runtime:String,
    Genre:String,
    imdbRating:String,
    Language:String,
    Country:String
}) ;

const Movie=model('Movie',MovieSchema);

movie.post('/',async (req,res)=>{
   try{
        const movie=req.body;
        console.log(movie)
        const {Title,Year,Realeased,Runtime,Genre,imdbRating,Language,Country}=movie;
        let data={
            Title,
            Year,
            Realeased,
            Runtime,
            Genre,
            imdbRating,
            Language,
            Country
        }
        const moviedata=await Movie.create(data);
        return res.send(moviedata)
   }catch(error){
    console.log(error);
    return res.status(500).send("internal server error");
   }
})

movie.get('/',async (req,res)=>{
    const moviedata=await Movie.find();
    return res.send(moviedata);
})


module.exports = movie;