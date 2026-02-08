//main server file 
const express=require('express');
const { PORT } = require('./config/server.config');
const app=express();

//Generally it's a good practice to actually add a route for checking the ping on th service whther thats ervie is alive or not 

app.get('/ping',(req,res)=>{
    return res.json({message:"Problem Serive is Alive"});
});
//if any point of time if you want to check if any service is alive or not then you can make check on ping service 

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
});












