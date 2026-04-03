const {Problem}=require('../models');
const { problemService } = require('../services');

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
}


module.exports=ProblemRepository;
