import {Queue} from "bullmq";
import redisConncetion from "../config/redisConfig";

export default new Queue("SampleQueue",{connection:redisConncetion});
/**
 * it all depend on usecase like 
 * lets say you have a payment module , when the payment is done you want to send email to the user, so will
 * so we will have payment service and emailing service
 * 
 * so when a payment is done we will add an emailing job to the queue and emailing service will picck that jobs form queue and then process it soon...
 */



