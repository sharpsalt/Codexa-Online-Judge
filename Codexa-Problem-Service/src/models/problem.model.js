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
        type:String,
        required:[true,"Desciption cannot be empty"]
    },
    difficulty:{
        type:String,
        //ye enum se define krenge to jayda sahi hoga sb ke liye 
        enum:['easy','medium','hard'], 
        required: [true,'Difficulty cannot be empty'],
        default:'easy'
    }
});
/*
We can actually do validation as well like whenever your were defining a schema
whatever property you have assign a object and define the corresponding set of validation and then do rest

whenever we try to create a branch new problem using problem model and we donot padd the title then ongoose will throw error
For storing images we will use markdown,else w e can use coudinary as well or we could also use amazon aws s3


Tag bhi lagaskte hai ismein 
*/









