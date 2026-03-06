const {BaseError}=require('../errors/base.error');
const {StatusCodes}=require('http-status-codes')

function errorHandler(err,req,res,next){
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


