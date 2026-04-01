const express=require('express');

const problemRouter=require('./problems.routes');

const v1Router=express.Router();

//if any request comes and route continues with /problem, we map it to ProblemRouter
v1Router.use('/problem',problemRouter);

module.exports=v1Router;











