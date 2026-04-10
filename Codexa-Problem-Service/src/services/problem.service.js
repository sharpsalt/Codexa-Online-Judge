const sanitizeMarkdown = require("../utils/markdownSanitizer");
const BadRequest = require("../errors/badrequest.error");
const NotFound = require("../errors/notfound.error");
const logger = require("../config/logger.config");

class ProblemService{
    /*
    ProblemService class is going to have a problemRepository which is going to be passed as constructor 
    because lets say  want to say that i want to  store thing in one db, but later if i want it to in another db, 
    so that was the benefit of keeping repository level seperate , that my service can interact ith any kind of repository so we don't have tight coupling
     
    */
    constructor(problemRepository){
        this.problemRepository=problemRepository;
    }
    /*
    Why we are stroing things in constructor?

    ->Inside our service layer we execute our business logic 
    */

    async createProblem(problemData){
        //becuase we are storing problem details in the form of Markdown , then it may contain HTML
        //so if it contains HTML, then it also contains script tag,
        //if it contains script tag,then it may contain malicioss peice of code
        //and for our problem statement we don't have any kind of malicious things coming up 
        //
        //There is one package called as Sanitize HTML 
        //so if the user is submitting any kind of HTML, and if that API is getting exposed to hackers then there could be vulnerabilities

        //so simply install sanitize-HTML and sanitize your HTML 
        //we don't even get the HTML directly, we gt the markdonw for the HTML 
         
        //validation on data, should definately exist on backend as well as frontend,
        //there is a package called as marked
        //like marked parser, it is used inorder to mark the parser
        

        try{
            if(!problemData.title || problemData.title.trim()===''){
                logger.error('BadRequest: title is required');
                throw new BadRequest('title is required');
            }
            if(!problemData.description || problemData.description.trim() === ''){
                logger.error('BadRequest: description is required');
                throw new BadRequest('description is required');
            }
            if(!problemData.difficulty){
                logger.error('BadRequest: difficulty is required');
                throw new BadRequest('difficulty is required');
            }
            //2. Sanitize the markdown for description
            problemData.description = sanitizeMarkdown(problemData.description);
            logger.info(`Creating new problem: ${problemData.title}`);
            const problem=await this.problemRepository.createProblem(problemData);
            logger.info(`Problem created successfully with ID: ${problem._id}`);
            return problem;
        }catch(error){
            logger.error(`Error creating problem: ${error.message}`);
            throw error;
        }
    }

    async getAllProblems(){
        try{
            logger.info('Fetching all problems');
            const problems=await this.problemRepository.getAllProblems();
            logger.info(`Retrieved ${problems.length} problems`);
            return problems;
        }catch(error){
            logger.error(`Error fetching all problems: ${error.message}`);
            throw error;
        }
    }

    async getProblem(problemId){
        try{
            if(!problemId){
                logger.error('BadRequest: problemId is required');
                throw new BadRequest('problemId is required');
            }
            logger.info(`Fetching problem with ID: ${problemId}`);
            const problem = await this.problemRepository.getproblem(problemId);
            if(!problem){
                logger.error(`NotFound: Problem with ID ${problemId} not found`);
                throw new NotFound(`Problem with ID ${problemId} not found`);
            }
            logger.info(`Problem found: ${problemId}`);
            return problem;
        }catch(error){
            logger.error(`Error fetching problem: ${error.message}`);
            throw error;
        }
    }

    async deleteProblem(problemId){
        try{
            if(!problemId){
                logger.error('BadRequest: problemId is required');
                throw new BadRequest('problemId is required');
            }
            logger.info(`Deleting problem with ID: ${problemId}`);
            const problem=await this.problemRepository.getproblem(problemId);
            if(!problem){
                logger.error(`NotFound: Problem with ID ${problemId} not found`);
                throw new NotFound(`Problem with ID ${problemId} not found`);
            }
            const deletedProblem=await this.problemRepository.deleteProblem(problemId);
            logger.info(`Problem deleted successfully: ${problemId}`);
            return deletedProblem;
        }catch(error){
            logger.error(`Error deleting problem: ${error.message}`);
            throw error;
        }
    }
}

module.exports=ProblemService;

/*
Inside repository we write our query
in utils we write our extra functionality...
*/









