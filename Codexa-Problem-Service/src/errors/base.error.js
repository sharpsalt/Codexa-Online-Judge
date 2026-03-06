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
        super(description); //generally this description is used for returing to client
        this.name=name; //name of the error like whether it is bad request error, not implemented error, gateway timeout, server timeout, etc
        this.statusCode=statusCode;
        this.details=details; //to attach details of the error to the client side 
        //There is a property called as error.captureStackTrace (I took refernce from: stackoverflow)
        //what it does is:
        /**
         * It creates a .stack property on the object which when accused returns a string representing the location in the code at which Error.captureStackTrace() was called
         * so you can call it on corresponding object and you'll get it 
         */
        // Error.captureStackTrace(this);
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
 * we want custom error classes because sometime we will be throwing some unimplemeted exception, sometimes you'll be thrpwing bad request or not found, 
 * so for that we need custom error classes, because for every error code we want to handle it seperately 
 * Generally you find people uses it...
 * 
 * 
 * BaseError is kind of like an umbrella error class that you are goig=ng to create and you are extending it from nodejs property and it has 3 property name,message,stack
 * when we say BaseError extends Error means ki we inherit all the property of Error class (Basic Inheritance)
 * 
 * we pass super in description
 *
 */




/**
 * Like saar file me alag alag error likhne ke baad you might be thinking ki how by just creating this classes everything gonna work out 
 * so i will create errorHandler.js inside utils folder
 */







