import { Queue } from "bullmq";

import redisConnection from "../config/redisConfig";

export default new Queue('SubmissionQueue', { connection: redisConnection});
/**
 * Basically pehle configure karenge redis ka Connection chahiye rehta hai iss case mein as we know phir hum yaha pe queue ko banayenge 
 */