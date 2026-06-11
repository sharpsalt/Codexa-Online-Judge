import submissionQueue from "../queues/submissionQueue";

export default async function(payload: Record<string, unknown>) {
    await submissionQueue.add("SubmissionJob", payload);
    console.log("Successfully added a new submission job");
}
//ye submission queue hai , isme basically yaha pe insert krdenge ayoad ko 
