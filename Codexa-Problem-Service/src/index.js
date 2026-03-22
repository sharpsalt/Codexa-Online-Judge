//main server file 
const express=require('express');
const {BaseError}=require('./errors/base.error')
const bodyParser = require('body-parser');
const { PORT } = require('./config/server.config');
const app=express();
const apiRouter=require('./routes');
const errorHandler = require('./utils/errorHandler');
const connectToDB = require('./config/db.config');

//i will allow 3 input incoming format via bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//here we have given extended:true because to perfrom urlencoded middleware there are two algorithm 
//if you hover on extended then it allows you to choose between parsing the URL encoded data with the querying library or qs library (qs is the new one) that's why we have got warning while setting it up for input
app.use(bodyParser.text());

//It is not a normal middleware, basically it is an error middleware
// app.use(errorHandler); so this is not part of anything it will only be kicked in whn an exception happens

//if any request comes and route starts with /api, we map it to apiRouter
app.use('/api',apiRouter);


//Generally it's a good practice to actually add a route for checking the ping on th service whther thats ervie is alive or not 

app.get('/ping',(req,res)=>{
    return res.json({message:"Problem Serive is Alive"});
});
//if any point of time if you want to check if any service is alive or not then you can make check on ping service 

app.use(errorHandler);

app.listen(PORT,async ()=>{
    console.log(`Server started at ${PORT}`);
    //the moment i create server i will also create a branch new error object 
    //this error object will be our BaseError 
    // throw new BaseError("Some Error",404,{errromessage:"Something"});//we want to signal our exception that's why we throw it...
    //isko rakhenge and app on krenge to app crash krega because we are thworing an error and we don't know how to handle it '


    //how to handle it simply do try catch so hum try catch krdenge
    // try{
    //     //1. Opened a db conncetion
    //     //2. Queries on db, but a wrong wrong syntax query
    //     //3. Exception will be thrown
    //     throw new BaseError("Some Error",404,{errromessage:"Something"});
    // } catch(error){
    //     //log the error
    //     console.log("Somehting went wrong",error);
    // } finally{
    //     //close the db connection
    //     console.log("Executed Finally");
    // }
    await connectToDB();//basically jo bhi function me agar mereko await use krna hai to async use krna hi padta hai 
    console.log("Successfully connected to DB");
});

//Exception is an unexpected event that occurs during porgam execution and disrupts the normal flow of instruction.
//exception is a run-time issue so we have to be prepared for vaious kinds of exception.
//Exception Handling bahut important hota hai industry me like usme to sbkoi hi use krta hai 
//like humlog api call wgaera bhi issi se krte even...














