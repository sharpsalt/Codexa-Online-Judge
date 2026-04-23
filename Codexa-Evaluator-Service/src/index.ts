import express,{Express} from "express";
import serverConfig from "./config/serverConfig.js";
import apirouter from "./routes/index.js";
import sampleQueueProducer from "./producers/sampleQueueProducer.js";
import sampleWorker from "./workers/sampleWorker.js";
//All the custom imports(Imports which is created by me) is seperated, as tum usme bhi dekh skte ho

const app:Express=express();

app.use('/api',apirouter);

app.listen(serverConfig.PORT,()=>{
    console.log(`Server started at ${serverConfig.PORT}`);
    // console.log("Chalne laga basically");
    sampleWorker('SampleQueue');

    sampleQueueProducer('SampleJob',{
        name:"Srijan",
        company:"Google",
        position:"SDE 3",
        location: "Remote | BLR | London"
    });
})
/*
There is a flag as --kill-others
it kills others process if one exits or dies
*/