//main server file 
const express=require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/server.config');
const app=express();
const apiRouter=require('./routes');

//i will allow 3 input incoming format via bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//here we have given extended:true because to perfrom urlencoded middleware there are two algorithm 
//if you hover on extended then it allows you to choose between parsing the URL encoded data with the querying library or qs library (qs is the new one) that's why we have got warning while setting it up for input
app.use(bodyParser.text());

//if any request comes and route starts with /api, we map it to apiRouter
app.use('/api',apiRouter);


//Generally it's a good practice to actually add a route for checking the ping on th service whther thats ervie is alive or not 

app.get('/ping',(req,res)=>{
    return res.json({message:"Problem Serive is Alive"});
});
//if any point of time if you want to check if any service is alive or not then you can make check on ping service 

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
});












