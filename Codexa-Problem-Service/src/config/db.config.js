const mongoose=require('mongoose');
const { ATLAS_DB_URL, NODE_ENV } = require('./server.config');

async function connectToDB(){
    try{
        if(NODE_ENV=="development"){
            await mongoose.connect(ATLAS_DB_URL);
        }else if(NODE_ENV=="production"){
            await mongoose.connect("prod_db");
        }
        // `
        // What ideally should be here like if we are doing local dev setup then there should be different dev db 
        // If we are working with Prod environment then theere should be difference database for that and for testing we need different database too
        //There can be generally many environment like 
        //1) Development 
        //2) Testing
        //3) UI
        //4) QA
        //5) Prod
        //6) Pre-Prod
        //
        // `
    }catch(error){
        console.log("Unable to connect to the DB Server");
        console.log(error);
    }
}

module.exports=connectToDB;
