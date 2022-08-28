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

movie.put('/:id',async (req,res)=>{
    try{
         const id=req.params.id;
        
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
         const moviedata=await Movie.updateOne({"_id":{"$eq":id}},data);
         return res.send("data Update Successfully");
    }catch(error){
     console.log(error);
     return res.status(500).send("internal server error");
    }
 })

// movie.get('/',async (req,res)=>{
//     const moviedata=await Movie.find();
//     return res.send(moviedata);
// })


movie.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    const moviedata=await Movie.deleteOne({"_id":{"$eq":id}});
    return res.send("Movie has been Deleted")
})

movie.get('/name/:name',async (req,res)=>{
    const moviedata=await Movie.findOne({"Title":{"$regex":req.params.name,"$options":"i"}});
    return res.send(moviedata)
})
movie.get('/id/:id',async (req,res)=>{
    const moviedata=await Movie.findOne({"_id":{"$eq":req.params.id}});
    return res.send(moviedata);
})

movie.get('/',async (req,res)=>{

    const {page,perPage,sortType,sort}=req.query;
    let sortTypeValue=(sortType=="ASC"?1:sortType=="DSC"?-1:1);
    let skip=(page*perPage)-perPage;
    const moviedata=await Movie.find().sort({[sort]:sortTypeValue}).skip(skip).limit(perPage);
    return res.send(moviedata);
})


module.exports = movie;