const mongoose=require('mongoose');
const { ATLAS_DB_URL } = require('./server.config');

async function connectToDB(){
    try{
        await mongoose.connect(ATLAS_DB_URL);
    }catch(error){
        console.log("Unable to connect to the DB Server");
        console.log(error);
    }
}

module.exports=connectToDB;
