import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefinition";
// import {Job} from "./type"

export default class SampleJob implements IJob{
    //don't you think name of the job is same as of class name...
    /**
     * and in javascript
     * 
     * There is a very cool blogs like 
     * When and how to use interfaces and classes in TypeScript
     * 
     * inside this interface we have name, but we don;t implement , while implementing we do overide things 
     */
    name:string;
    payload:Record<string,unknown>;
    constructor(payload: Record<string,unknown>){
        this.payload=payload;
        this.name=this.constructor.name;
    }
    //we need handler as well
    //we can mao jobid with submission here,like each job will have corresponding unique id
    //
    handle=(job?: Job)=>{
        console.log("Handler of the job called");
        console.log(this.payload)
        if(job){
            console.log(job.name,job.id,job.data);
        }
    }

    failed=(job?: Job):void=>{
        //in case job fails then simply we will log it 
        console.log("Job failed ");
        if(job){
            console.log(job.id);
        }
    }
}


