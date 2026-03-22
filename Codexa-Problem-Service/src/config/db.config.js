const mongoose=require('mongoose');
const { ATLAS_DB_URL } = require('./server.config');

async function connectToDB(){
    try{
        await mongoose.connect(ATLAS_DB_URL);
        // `
        // What ideally should be here like if we are doing local dev setup then there should be different dev db 
        // If we are working with Prod environment then theere should be difference database for that and for testing we need different database too
        // `
    }catch(error){
        console.log("Unable to connect to the DB Server");
        console.log(error);
    }
}

module.exports=connectToDB;
