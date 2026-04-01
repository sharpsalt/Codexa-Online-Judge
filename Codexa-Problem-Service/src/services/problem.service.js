const sanitizeMarkdown = require("../utils/markdownSanitizer");

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
            //1. Sanitize the markdown for description
        problemData.description=sanitizeMarkdown(problemData.description);
        console.log("Problem data: ",problemData);
        const problem=await this.problemRepository.createProblem(problemData);
        console.log("Problem Created: ",problem);
        return problem;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

module.exports=ProblemService;

/*
Inside repository we write our query
in utils we write our extra functionality...
*/









