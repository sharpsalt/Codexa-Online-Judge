const {BaseError}=require('./base.error');
const {StatusCodes}=require('http-status-codes')
//since BaseError has itself a constructor and just require name 

//so everyBadRequest is going to have common name 
class BadRequest extends BaseError{
    constructor(propertyname,details){
        super("BadRequest",StatusCodes.BadRequest,`Invalid Structure for ${propertyname} provider`,details);
        //Every bad request can have a common description so ye kaha se aayega 
        //so our Constructor woll take propertyName, so 
        //let's say if somebody sends a request with empty description so we will send him a BadRequest (400 Status Code) like it is a client side error to 
    }
}

module.exports=BadRequest;



