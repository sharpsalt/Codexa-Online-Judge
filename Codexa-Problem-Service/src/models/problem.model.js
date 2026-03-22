const mongoose=require('mongoose');
const {Schema}=mongoose;

// This Schema function is kind of like a Schema constructor
//Inside this object we will pass all of the corresponding property 
//that we can actually add 

const problemSchema=new Schema({
    title:{
        type:String,
        required:[true,"Title cannot be empty"]
    },
    description:{
         

        
    }
});
/*
We can actually do validation as well like whenever your were defining a schema
whatever property you have assign a objec and define the corresponding set of validation and then do rest

*/









