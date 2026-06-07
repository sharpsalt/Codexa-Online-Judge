import express from "express";

import { addSubmission } from "../../controllers/submissionController";
import { createSubmissionZodSchema } from "../../dtos/CreateSubmissionDto";
import { validate } from "../../validators/zodValidator";


const submissionRouter = express.Router();

submissionRouter.post(
    '/', 
    validate(createSubmissionZodSchema),
    addSubmission
    
);

export default submissionRouter;

/**
 * basically we are making Express Router jo /submission wale endpoint ko defined kr rahe hai 
 * pehle validate krenge,phir addSubmission pe jayega , means dono hi middleware hai
 * 
 * agar complete flow bole toh
 * POST /submissions
 * 
 * body:
{
   "userId":"123",
   "problemId":"456",
   "code":"print('hello')",
   "language":"python"
}
 * express interally kuch aisa krega 
validate(createSubmissionZodSchema)->schema.parse(req.body)->valid? yes next() nahi to ahi pe rukgea since hum try cathc me krhe hai so it will work tho->addSubmission(req,res)->database save->response {"success":true}
 */