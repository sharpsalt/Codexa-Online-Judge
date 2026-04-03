const {BaseError}=require('./base.error');
const {StatusCodes}=require('http-status-codes');

class NotFoundError extends BaseError{
    constructor(resourceName,resourceValue){
        super("NotFound Error",StatusCodes.NOT_FOUND,`The requested resource:${resourceName} with value ${resourceValue} is not found`,{resourceName,resourceValue});
    }
}


module.exports=NotFoundError;