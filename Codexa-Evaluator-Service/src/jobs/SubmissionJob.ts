import { Job } from "bullmq";

import evaluationQueueProducer from "../producers/evaluationQueueProducer";
import { IJob } from "../types/bullMqJobDefinition";
import { ExecutionResponse } from "../types/CodeExecutorStrategy";
import { SubmissionPayload } from "../types/submissionPayload";
import createExecutor from "../utils/ExecutorFactory";
export default class SubmissionJob implements IJob { //interface ko implement krrhe hai iss calss ke through
    name: string;
    payload: Record<string, SubmissionPayload>;
// {
//     "submission123": {
//         code: "print('Hello')",
//         language: "python",
//         inputCase: "5",
//         outputCase: "5",
//         userId: "u1",
//         submissionId: "s1"
//     }
// }
    constructor(payload: Record<string, SubmissionPayload>) {
        this.payload = payload; //basically isme payload daal denge
        this.name = this.constructor.name; //agar dekho example ke hisaab se ye "submission123"
    }

    handle = async (job?: Job) => {
        //jab worker call krta hai handle ko to ye chalega
        //qki ye handler krega
        console.log("Handler of the job called");
        console.log(this.payload);
        if(job) {
            const key = Object.keys(this.payload)[0];
            const codeLanguage = this.payload[key].language;
            const code = this.payload[key].code;
            const inputTestCase = this.payload[key].inputCase;
            const outputTestCase = this.payload[key].outputCase;
            const strategy = createExecutor(codeLanguage); //Factory Patter use kiye hai, qki dusre side ye sidhe switch case mein hum
            //isko wrap kiye hai to based on that wo chal jayega
            console.log(strategy);
            if(strategy != null) {
                const response : ExecutionResponse = await strategy.execute(code, inputTestCase, outputTestCase);

                evaluationQueueProducer({response, userId: this.payload[key].userId, submissionId: this.payload[key].submissionId});
                if(response.status === "SUCCESS") {
                    console.log("Code executed successfully");
                    console.log(response);
                } else {
                    console.log("Something went wrong with code execution");
                    console.log(response);
                }
            }
        }
    };

    failed = (job?: Job) : void => {
        console.log("Job failed");
        if(job) {
            console.log(job.id);
        }
    };
}