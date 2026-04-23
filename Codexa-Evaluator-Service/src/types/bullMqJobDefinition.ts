import {Job} from "bullmq";

export interface IJob{
    name:string //every job is going to have name whihc is of type string
    payload: Record<string,unknown> //as keys will be inthe form of string but the values can be anything
    handle: (job?:Job)=>void
    failed: (job?:Job)=>void
}


/**
 * Every job is going to have an object and that object will ahve some data 
 * let's say you have a mailer queue, so whenever we push usme job ka name , payload me data, and handler me logic likhenge ki us job ke saath kaise kya krna hai...
 */