import Docker from 'dockerode';
//will be using this library for creating docker container
//mtlb docker daemon se baat krne ke liye dockerrode library use karenge 

async function createContainer(imageName: string, cmdExecutable: string[]) {
    const docker = new Docker();
    //new container, mtlb docker Daemon se connection create 
    const container = await docker.createContainer({
        Image: imageName,
        Cmd: cmdExecutable,
        AttachStdin: true, // to enable input streams
        AttachStdout: true, // to enable output streams
        AttachStderr: true, // to enable error streams
        Tty: false, //interactive terminal to false krenge because normally docker me TTY hota hai , and online judge me 
        //ye false krke rakhte hai , qki hume terminal thode chahiye
        //
        //
        HostConfig: { //ye HostConfig si for container ka runtime restrictions
            Memory: 1024 * 1024 * 1024, // 1GB RAM
        },
        OpenStdin: true // keep the input stream open even no interaction is there
    });//ab ye conatiner create krenge hum

    return container;
}

export default createContainer;
/**
 * function 2 cheez leta hai 
 * imagename, and cmdExecutable
 * 
 * imageName ka ex:
 * "python:3.11","gcc:latest","openjdk:17"
 * container kis image se banana hai
 * 
 * wahi mera cmdExecutable ka ex de to
 * ["python", "main.py"],["./main"]
 * Container start hote hi kya execute karna hai.
 * 
 */