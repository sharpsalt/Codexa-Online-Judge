import {Request,Response} from "express";

export const pingCheck=(_:Request,res:Response)=>{
    // console.log(req.url);
    //if there is any usused variable then ust put the _ here
    return res.status(200).json({
        message:"Ping check ok"
    });
};

