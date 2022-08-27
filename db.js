const mongoose=require("mongoose");

async function connectDB(){
    return new Promise((resolve,reject)=>{
        const url='mongodb+srv://sam:sam@moviedb.gseux4l.mongodb.net/?retryWrites=true&w=majority';
        mongoose.connect(url,(err)=>{
            if(err){
                console.error('Error conecting to DB',err);
                return reject(err);
            }

            console.log("successfully connected to DB");
            resolve();
        })
    })
}

module.exports=connectDB;