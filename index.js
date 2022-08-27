const express=require("express");
const connectDB = require("./db");
const app=express();

app.use(express.json());
const movieRoute=require('./Routes/movie.route');






async function main(){
    await connectDB();
    app.use("/movie",movieRoute);
}



app.listen(8080,()=>{
    console.log("server started");
    main();
})
