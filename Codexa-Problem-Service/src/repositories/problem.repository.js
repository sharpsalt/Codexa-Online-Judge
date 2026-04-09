const NotFoundError = require('../errors/notfound.error');
const {Problem}=require('../models');
const logger = require('../config/logger.config');


class ProblemRepository{
    async createProblem(problemData){
        try{
            const problem=await Problem.create({
                title:problemData.title,
                description:problemData.description,
                testCases:(problemData.testCases)?problemData.testCases:[]
            });
            return problem;
        }catch(error){
            //here for the timing we are doing it m baad me isko handle krlenge 
            console.error(error);
            throw error;
        }
    }

    async getAllProblems(){
        try{
            const problem=await Problem.find({});
            return problem;
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async getproblem(id){
        try{
            const problem=await Problem.findById(id);//ye to simple mongodb ka hi code hai
            if(!problem){
                throw new NotFoundError("Problem",id);
            }
            return problem;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async deleteProblem(id){
        try{
            const deleteProblem=await Problem.findByIdAndDelete(id);
            if(!deleteProblem){
                logger.error(`Problem with id: ${id} not found in the db`);
                throw new NotFoundError("Problem ",id);
            }
            return deleteProblem;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
    /*
    When we are going to throw a brand new error, ideally we should actaully log whatever data we are getting 
    because later what can happen in production in that some user is trying to do some operation and it'll get failed

    we might have to debug why it is failing, etc like user can create tikcet for anything 
    so we need to have a proper trace-back log
    
    logging mechanisum is very useful for overall application to do debugging also 
    like in production koi bhi issue aata to debug krna bahut hi easy hota hai uss case mein

    There are a lot of logging library that are present like we will use winston 

    It basically supports multiple transports

    In general like in any good company, 
    there were certain set of logs, that we sue to maintain for atleast 30 days 
    because the amount of logs generate is always high


    so companies always has to make sure that they must have to dump their logs after few time.
    so we also have same logging mechanism like winston se mera ye console ya files me save hoga basically


    npm i winston kro pehle

    now we need to start the logging mechanism( ek baar docs dekhlna officially)
    so go to config layer and do the configuration
    */
}


module.exports=ProblemRepository;

    
    
    // npm i winston kro pehle 
    
    // now we need to start th ee logging mechanism ek () ek baar tum wo  logging mechanism krlena  docs dekhlnaar offiicially wa
    // so go cto congfig layer and do the configurwtaiona
    //             logger.warnconsole.warn();
    //             error()""Problem with if: $```Problem with if: d: ${}id not found in the db