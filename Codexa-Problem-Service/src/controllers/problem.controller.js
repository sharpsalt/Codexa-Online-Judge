const { StatusCodes } = require('http-status-codes');
const NotImplemented = require('../errors/notimplemented.error');
const {problemService}=require('../services');
const ProblemService = require('../services/problem.service');

function pingProblemController(req,res){
    return res.json({message:'Ping Controller is working fine dude'});
}

// function addProblem(req,res,next){
//     //This willl be our Create API
//     // return res.status(StatusCodes.NOT_IMPLEMENTED).json({
//     //     message:"Not Implemented",
//     // });
//     try{
//         //nothing implemented
//         throw new NotImplemented('addProblem');
//     }catch(error){
//         next(error);
//         //suppose i don't call next then what should happen
//         // console.log(error);//if i send it then request stall kr jayega
//         /**
//          * Why the request will be stalled?
//          * 
//          * Solution
//          *        You send a request , you came to this function, throw an exception and yuou just locked an error, like you have never returned any response
//          * so when we are calling next(error); instead of console.log(error), it is calling expressjs middleware
//          * and it does return an error response
//          * 
//          */
//     }
// }
//so basically we have to make it async function now 
async function addProblem(req,res,next){
    try{
        // console.log("incoming req....");
        const newproblem=await problemService.createProblem(req.body);
        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:"Successfyully created a new Problem",
            error:{},
            data:newproblem 
        });
    }catch(error){
        console.log(error);
        throw error; 
    }
}
 
async function getProblem(req,res,next){
    try{
        //nothing implemented
        const problem=await problemService.getproblem(req.param.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            error:{},
            message:"Succesfully fetched aproblem",
            data:newproblem
        })
    }catch(error){
        next(error);
    }
}

async function getProblems(req,res,next){
    try{
        //nothing implemented
        // throw new NotImplemented("Get Problems");
        const response=await ProblemService.getAllProblems();
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"Successfully dteched all the problems",
            error:{},
            data:newproblem
        })
    }catch(error){
        next(error);
    }
}

function deleteProblem(req,res,next){
    try{
        //nothing implemented
        throw new NotImplemented("delete Problems");
    }catch(error){
        next(error);
    }
}

function updateProblem(req,res,next){
    try{
        //nothing implemented
        throw new NotImplemented("Update Problems");
    }catch(error){
        next(error);
    }
}

module.exports={
    addProblem,
    getProblem,
    getProblems,
    deleteProblem,
    updateProblem,
    pingProblemController
}
//since you might be thinking that i will not be directly importing from my probelm.controller.js file , why?
//inside routes we have v1 
//suppose i am preparing express router there and map corresponding function
//now to map i can simply import from problem.controller.js , but if there are multiple controllers then i will have to do multiple imports 
//so for every controller i have to create a new import or required statement altogether
//thats why i have done like it 

//so that why we have done like that and check for index.js in this same depth 



//There is a very interesting documentation by microsoft, like usme humko ye bataya ki how to write in best way for REST Api(Representational State Transfer)
//basically if we follow rest then your project structure will be much more consistent 
//learn.microsoft/ best pratcice / architecture/ rest aise krke hoga 

//REST kehta hai keep your routes resource oriented(ye wahi website se dekhe hai)
/**
 * you can name your routes like
 *                            /api/v1/create-problem  (Not recommeneded)
 * because this is action oriented 
 * 
 *                            /api/v1/problems   (recommended)
 * because this is resource oriented
 * 
 * 
 * Like we know ki GRPC kya hota , so grpc to aisa bolta bolta hai we prefer action-based routes
 * so again it's a convention , it's just a set of recommendation
 * 
 * 
 * 
 * 
 * res
 * 
 * res.status->returns the same response object with status property set
 * res.json  ->returns the same response object which has status set but this json to be returned is also sent
 * 
 * 
 * agar ye nhi krna to ek aur method hai like 
 * npm i http-status-code
 * 
 * How to import it:
 *                 const { StatusCodes } = require('http-status-code');
 * 
 * 
 * It actually maps all of thenumerics status code to its proper name, technically it is very better to have...
 * so pehle :
 *          return res.status(501).json({"_______"});
 * ab: 
 *          return res.status(StatusCodes.NOT_IMPLEMENTED).json({});
 * 
 * but bro i have linux and usme bahut vulnerabilities dikharaha might be some package has been broken so i will choose simple one 
 * when i will shift to windows then i will make assure of it.
 */








