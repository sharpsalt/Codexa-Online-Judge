// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import { CPP_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';

// TODO: Migrate to strategy pattern
async function runCpp(code: string, inputTestCase: string) {

    const rawLogBuffer: Buffer[] = []; //Dpcker output chunks me yahan pe store hoga
    console.log("Initialising a new cpp docker container");
    await pullImage(CPP_IMAGE);//mtlb it is equivalent to wahi docker pull gcc
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;
    console.log(runCommand);
    const cppDockerContainer = await createContainer(CPP_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); ///normally run krdenge sh file me rakh ke save krke


    // starting / booting the corresponding docker container
    await cppDockerContainer.start();

    console.log("Started the docker container");

    const loggerStream = await cppDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true // whether the logs are streamed or returned as a string
    });
    
    // Attach events on the stream objects to start and stop reading
    loggerStream.on('data', (chunk: Buffer) => {
        rawLogBuffer.push(chunk);
    });//Docker ke stdout/stderr capture kr rahe ho yahan pe and collet chunks mein

    //wait until program finishes
    //yaha pe code jayega jab tak program complete na ho
    const response = await new Promise((res) => {
        loggerStream.on('end', () => {
            //jab container output dena band krde , mtlb Program Finished
            //To us time buffer to merge krdo 
            /**
[
 Buffer("2"),
 Buffer("0")
]
->20 ye mera completed Buffer me aayega 
             */
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            /**
aur ye mera decodedStream krega 
like pehle 

stdout: 20
stderr:

lekin ye convert hoke 

{
   stdout: "20",
   stderr: ""
}
             */
            console.log(decodedStream);
            console.log(decodedStream.stdout);
            res(decodedStream);
        });
    });
    
    // remove the container when done with it
    await cppDockerContainer.remove();
    return response;

}       

export default runCpp;
/**
Complete flow of it:

User submits C++ code
        ↓
Pull gcc image
        ↓
Create Docker container
        ↓
Write code to main.cpp
        ↓
Compile using g++
        ↓
Run executable
        ↓
Capture stdout/stderr
        ↓
Decode Docker stream
        ↓
Delete container
        ↓
Return output

 */