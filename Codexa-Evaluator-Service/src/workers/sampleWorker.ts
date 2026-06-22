/**
 * You are going o define like whenever our queue gets something then how does it behave
 */

import { Job, Worker } from "bullmq";
import SampleJob from "../jobs/SampleJob";
import redisConnection from "../config/redisConfig";

export default function sampleWorker(queueName:string){
    console.log("Setup the connection for redis ")
    new Worker(
        queueName,
        async (job: Job)=>{
            console.log("Sample job worker kicking ",job);
            if(job.name==="SampleJob"){
                const sampleJobInstance=new SampleJob(job.data);
                sampleJobInstance.handle(job);

                //write your handler directly

                return true;
            }
            return false;
        },{
            connection: redisConnection
        }
    );
}