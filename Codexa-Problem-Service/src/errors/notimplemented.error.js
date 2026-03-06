const BaseError=require('./base.error');
const {StatusCodes}=require('http-status-codes');

class NotImplemented extends BaseError{
    constructor(methodName){
        super("NOtImplemented",StatusCodes.NOT_IMPLEMENTED,`${methodName} Not Implemented`, {});
    }
}

module.exports=NotImplemented;

//There are more to be implemented 
// ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCods
//These 4 are Main heart of http-status-codes,like i got this from docs so once if you ever be free then do study it once
