const winston=require('winston');
const { LOG_DB_URL } = require('./server.config');
const { collection } = require('../models/problem.model');
require('winston-mongodb') //as it is written in documentation of winston
const allowedTransports=[];

//the below transport configuration enables logging on the console
allowedTransports.push(new winston.transports.Console({
    format:winston.format.combine(
        winston.format.colorize(),
        // winston.format.simple()
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf((info)=>`${info.timestamp} [${info.level}]: ${info.message}`)
    ),
}));
//Inside this console we also have to configure, if we won't configure then it is just a default...

//The below transport configuration enables logging in database
allowedTransports.push(new winston.transports.MongoDB)({
    level:'error',
    db:LOG_DB_URL,//this will help us to connect
    collection:'logs',
    // format:winston.format.combine(

    // )
    /*
    There is some meta property, cap size, and decolorize, and many more like tum documentation se baaki dekhlena if you want to explore more
    */
});
/*
Now we need winston-mongodb package 
npm i wisnton-mongodb
now i will configure it , like tum usme dekho 

and then here inside this mongodb function you'll pass an object where you have configuration to connect to mongodb
since storing in db for logs is an expensive things and i don't want my all logs to go in dbs
if you want any specific type of log to go in db then uske liye level decide krna pdega to 
for anykind of transport if i define the level thn uske hisaab se hi hoga mera usmein
 and then there is a db property which contain the mongdb connection url,so it is in .ENV

*/

//The belo transport configuration enables logging in 
allowedTransports.push(new winston.transports.File)({
    filename: `app.log`
})

const logger=winston.createLogger({
    level:'info',
    format:winston.format.combine(
        ///first argument to the combine method is defining how we want out timestamp to comeup
        winston.format.errors({stack:true}),
        winston.format.timestamp({
            format:'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf((info)=>`${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}: ${info.stack}`),//this will actually tell what to print
        //since every log has kind of like level so the log can beinformation log,error log,etc
        //error log is something which is going to be our main priority

        //bare minimum is we should have log on console
        //if you want to log on database then you need some database that can store that sheer amount of log
        //one way to handle it is file based database
        winston.format.colorize(),
    ),
    transports:allowedTransports
});

module.exports=logger;
/*
This createlogger expects an object

first we will pass format: like when log is going to give output on file or console then how does the output would loook like
so we have to configure


There are 2 perspective: 
1) Ideally, these errors logs should come on your console but file based logs should not be technically stored inside the application server.
   let's say we provision server from aws, so technically we should insert more mechanish


   so we will write the mechanism in such way that whole of the logic will get dumped into some datawarehouse or database etc
   so even if somene is creating too much log then,still we have to face no problem 


2) Ratelimiting , we have to use ratelimiter inside application os nobody abused our applications iwth many requests at a same time



in console.log you can't define serpeerately error log,debug log,etc
and isme transport is the place where the logs will comeup


since we are using 3rd party library , so isn't it slow???

Actually there is a Library called as SLF4J, 99% of the company having java based company uses slf4j, it's not gonna it slow 
for example they don't have to make synchronous call for printing this call
when you are on scale,jaha pe log ke wajah se bhi latency aarahai hai iska mtlb ki already mere pass bhut bada userbase aagaya hai 



There is something called as winston sqlite3
mtlb it is to be configured with sqlite3, basically winston has sqlite 3 transport
so humlog sqlite me bhi configure krskte hi isko


*/





/*
Log bolenge ki log ko save kyu krna hai,benefits kya hai 
suppose you are working in swiggy
 and someone has placed an order but their payment has deducted, but the order didn't get placed
 probably why, let's say you have razorpay payment gateway, the razorpay payment gateway gave an error response
 the user just understand that the payments gets deducted but don't know how this is happened , 

 now a ticket came to you that during an order, the payment has got deducted but yet the order hasn't been placed so how did you solve this problem without knowing the fact that 
 why your function/api didn't place an order
  kya ab tum wapas se bologe kya ki sir sir wapis se order krne mai logs monitor krrha hu 

 so tum millions of order me utna thode na monitor kroge that's why we maintain a logger behind the scene


 ek baar stacktrace padh lena isme ka , if you are able to attach stack then you can easily trace from stack ki kaha se aaya hai ye 
*/


/*
logging is pretty important, like log PR tak reject krdete hai if you have not done any loggging,
like in google there is nothing called as git, there is something called as Piper
Piper heavily depends on hashing,trees,etc

we have to write recursive logic till the wrapping comes up, till the final error details comes up
like in databases, something called as string mathcing also includes
indexes bhi hota databases to usme proper algorithm use hota hai...etc


if you bychance lands up in a team which contributes to the team at react then all the logic is totally by recursrive trees etc

like frontend my polyfills hota hai,there is something called as document.getElementById
so basically from your DOMtree we have to our html node which has a particular id , and we parse it usng dfs, it is not binary tree , so ye generic tree hota hai 
*/