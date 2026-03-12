const {BaseError}=require('../errors/base.error');
const {StatusCodes}=require('http-status-codes')

function errorHandler(err,req,res,next){
    //The moment yiu have 4 parameters then specially it is an error handler , while if it has 3 parameter then it acts as normal middleware
    /**
     * agar 3 parameter rakheneg to bas yahi tak aayega and it is not even letting to touch the controller layer
     * so ab TypeErro bhi aayega since we are returning res.status, because technically it is 3 parameter middlewarde and it is not finding ki kya krna hao so wahi se exception throw krrha hai 
     * res.status se ki res.status me wo mila hi nahi that;s why we get TypeError
     * 
     * If the errorHandler will handle my code error , but what if this errorHandler function has itself error 
     *   ? to us time kon handle krega ?
     * that is handled by express js error handler...
     * 
     * 
     * Basically i am tryng to convey ki agar isme bhi flaw hai to next middleware handle krega , so who is next middleware to wo express ka error handler middleware hoga 
     * 
     */
    // console.log(error);
    if(err instanceof BaseError){
        return res.status(err.statusCode).json({
            success:false,
            message:err.message,
            error:err.details,
            data:{} //because this is an exception so no data is going to be provided
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:'Something Unexpected happened',
        error:err,
        data:{}
    })
}

//lets say if we got an error which is not a part of BaseError then we will simply just return 


module.exports=errorHandler;
//This is custom error handler that we have prepared
/**
 * Now how about i register this error handler as middleward after all of the requests
 * so tum agar problem.controller.js me jaake dekhoge to 
 * function xyz(req,res){
 * }
 * 
 * ke jagah hum 
 * function xyz(req,res.next){
 * }
 * aisa krdenge, because now controller is not the last middlewarde and if any exception happends then last middle ware will be errorhandler
 * isliye waha function me try catch laga denge 
 *
 */


