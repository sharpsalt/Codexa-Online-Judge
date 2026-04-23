/**
 * You are going o define like whenever our queue gets something then how does it behave
 */

import {Worker} from "bullmq";
import SampleJob from "../jobs/SampleJob";
import redisConncetion from "../config/redisConfig";
import { connect } from "net";

export default function sampleWorker(queueName:string){
    console.log("Setup the connection for redis ")
    new Worker(
        queueName,
        async (job:Job)=>{
            console.log("Sample job worker kicking ",job);
            if(job.name==="SampleJob"){
                const sampleJobInstance=new SampleJob(job.data);
                sampleJobInstance.handle(job);

                //write your handler directly

                return true;
            }
        },{
            connection:redisConncetion
        }
    );
}