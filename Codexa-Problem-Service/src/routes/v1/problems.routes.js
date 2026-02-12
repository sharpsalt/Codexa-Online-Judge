const express=require('express');
const {ProblemController}=require('../../controllers');
const { pingProblemController } = require('../../controllers/problem.controller');
  
const problemRouter=express.Router();

//If any request coms and route continues with /ping, we map it to pingProblemController
problemRouter.get('/ping',pingProblemController)

problemRouter.get('/:id',ProblemController.getProblem);

problemRouter.get('/',ProblemController.getProblems);

problemRouter.post('/',ProblemController.addProblem);

problemRouter.delete('/:id',ProblemController.deleteProblem);

problemRouter.put('/:id',ProblemController.updateProblem);

module.exports=problemRouter;
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 