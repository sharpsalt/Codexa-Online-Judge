import sampleQueue from "../queues/sampleQueue";

export default async function(name:string,payload:Record<string,unknown>,priority:number){
    await sampleQueue.add(name,payload,{priority});
    console.log("successfully added a new job");
    //it will add that to queue
}
//so if you ahve paid user and free user just add the priority to the paid user and boom, the feature is implemented
//if we pass same priority, then it would take the concept of FCFS

/**
 * There is a library called as BullBoard, it actually gives you a UI , which gives aus dashboard, it simply presenst us the concept of quuee like how much this thing is there etc etc 
 * ye hum dusre projects me bhi daal skte hai...
 */