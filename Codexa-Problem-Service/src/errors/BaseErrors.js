//This is a common baseError class and make sure that other would extend from it 

class BaseError extends Error{
    constructor(name,statusCode,description,details){
        //mdn Error pe se dekha jaaye to 
        //This JS Class alos has bunch of Property 
        /**
         * Error.prototype.name: The name date property of Error.protoyype is shared by all Error instances. It represents the name for the type o error(for Error.prototype.name, the intial value is "Error"). Subclasses like TypeError and SyntaxError provide thier won properties
         * basically whenever we create a branh new object then hum isme bahut saara property deskte 
         * 
         */
        super(description);
        this.name=name;
        this.statusCode=statusCode;
        this.details=details;
        //There is a property called as error.captureStackTrace (I took refernce from: stackoverflow)
        //what it does is:
        /**
         * It creates a .stack property on the object which when accused returns a string representing the location in the code at which Error.captureStackTrace() was called
         * so you can call it on corresponding object and you'll get it 
         */
        Error.captureStackTrace(this);
        //ye rakhne se 
        /**
         * Like on the corresponding object e have .stack property 
         * NOTE-The first Line of the traced will be prefixed by ${myObject.name}: ${myObject.message}
         * The optional constructorOpt argument accepts a function. If given, all frames above construcorOpt, including constructorOpt, will be omitted from the genrated stack trace
         * The constructorOpt argument is useful for hiding the implementations details fo eror generation from the suer
         * 
         */
    }
}

module.exports={BaseError};

/**
 * There is one more block called as Promise.prototype.finally, and even in try,catch me bhi finally rehta
 * 
 * Finally blocks me statements that are executed before control flow exits are actually present.
 * Finally block ko ye matter krta ki kon execute kiya ya kon nahi ,ffinally block always execute 
 * if let's say there is no error and eveything executed properly and after its executoion it done for finally 
 * 
 * Let's say you opened a DB Connection and done some queries on that DB 
 * but you have wrote wrong syntax query
 * so inside catch block we will do console.log("")
 * then finally chalega in whcih we will do close our DB connection
 * 
 * Basically we also need proper error handling  mechanism
 * 
 * 
 */











