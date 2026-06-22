import { NextFunction, Request, Response } from 'express';//isko humog express middleware factory bolte hai,basically
/*
request: incoming http request ke liye 
response: client ko response bhejne ke liye 
nextFunction: middleware chain main next middleware ko call krta hai
*/ 
import { ZodSchema } from 'zod';//yaha zod ko schema type import krrhe hai

// eslint-disable-next-line @typescript-eslint/no-explicit-any
//ye function parameter lega schemo ko which is ot tyoe ZodSchema<any>, mtlb koi bhi zod schema pass krdo
//aur ye function basically ek function return krrha hai aisa smjho
export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction): void => {
    try {
        schema.parse({
            ...req.body//spread operator
        });

        next();//mtlb validation hogyi ,ab agle middleware pe chalao

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Invalid request params received',
            data: {},
            error: error 
        });
    }
};
//Controller tak pahunchne se pehle request body ko Zod se validate karo; valid ho to next(),warna 400 error return karo.