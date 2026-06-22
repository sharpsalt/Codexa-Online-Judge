import { Job, Worker } from "bullmq";
/**
 * Mera worker queue ko continuously listen krta hai and Job->queue me stored ek task
 */

import redisConnection from "../config/redisConfig";//qki BullMQ internally redis use krta hai queue maintian krne ke liye 
import SubmissionJob from "../jobs/SubmissionJob";

export default function SubmissionWorker(queueName: string) {//ye bhi kisi bhi queue ke liye worker create karega
    new Worker(
        queueName, //wahi jisnaam se create krna us naam se basically, to ye worker queue ko listen krega
        //jab queue me naya job aayega to callback chalega
        async (job: Job) => { //har incoming job ke liye chalega mera ye 
// {
//   "name": "SubmissionJob",
//   "data": {
//     "code": "print('hello')",
//     "language": "python"
//   }
// }
//agar aisa kuch aaraha hai Json mein to name:SubmissionJob hua and job.data mera wp hoga
            // console.log("SubmissionJob job worker kicking", job);
            if(job.name === "SubmissionJob") {
                const submissionJobInstance = new SubmissionJob(job.data);//object creation
                console.log("Calling job handler");
                await submissionJobInstance.handle(job); //agar yaha pe await nahi lagate to worker job ko complete mark kar sakta hai before actual execution finish ho jaye.
                //main yahi hai
                //as worker job uthata and handler ko call krta hai wo

                return true;
            }
            return false;
        },
        {
            connection: redisConnection
            //Taki worker redis se connect kr sake
        }
    );
}