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
    },
    testCases:[
        //ye aise krne se mera tast cases is not a mandatory field ban jayega 
        { 
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            }
        }
    ],
    editorial:{
        type:String
    }
});

const Problem=mongoose.model('Problem',problemSchema);

module.exports=Problem;
/*
We can actually do validation as well like whenever your were defining a schema
whatever property you have assign a object and define the corresponding set of validation and then do rest

whenever we try to create a branch new problem using problem model and we donot padd the title then ongoose will throw error
For storing images we will use markdown,else w e can use coudinary as well or we could also use amazon aws s3


Tag bhi lagaskte hai ismein 


Mongoose Model is an object using which i can query for this particular problem collection
so if i have to do anything around problems then i will use Problem Model object
You can execute your ODM,ORM based on it

*/









