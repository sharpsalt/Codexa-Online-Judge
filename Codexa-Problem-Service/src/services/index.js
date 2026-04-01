const ProblemService=require('./problem.service');
const {ProblemRepository}=require('../repositories');

module.exports={
    problemService:new ProblemService(new ProblemRepository())
}