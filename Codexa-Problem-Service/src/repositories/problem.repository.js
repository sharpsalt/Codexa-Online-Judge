const {Problem}=require('../models');

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
}


module.exports=ProblemRepository;
