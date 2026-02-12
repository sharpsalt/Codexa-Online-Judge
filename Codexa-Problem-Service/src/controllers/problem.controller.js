function pingProblemController(req,res){
    return res.json({message:'Ping Controller is working fine dude'})
}

function addProblem(req,res){
    //This willl be our Create API
}

function getProblem(req,res){

}

function getProblems(req,res){

}

function deleteProblem(req,res){

}

function updateProblem(req,res){

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











