import Docker from 'dockerode'; //docker daemon se baat krne wala library
/**
Docker image machine pe present hai ya nahi check karo
agar nahi hai to pull/download karo, aur download complete
hone ka wait karo.
 */

//suppose i call "await pullImage("python:3.11")"
export default async function pullImage(imageName: string) {
    try {
        const docker = new Docker();//pehle docker daemon se connectio banao
        return new Promise((res, rej) => {//yaha pe Promise isliye use kiye hai qki mera 
            //docker.pull is a callback based API hai
            docker.pull(imageName, (err: Error, stream: NodeJS.ReadableStream) => {
                if(err){
                    // throw err;//agar image pull start hi nahi hui
                    return rej(err);//qki callback ke andar throw kabhi kabhi Promise ko properly reject nahi krta hai 
                }
                //stream:Image download ka live stream
                /**
                 * Socho
Downloading
Downloading
Extracting
Complete
                 * ye sb stream ke through aata hai
                 */
                docker.modem.followProgress(stream, (err, response) => err ? rej(err) : res(response), (event) => {
                    console.log(event.status);//iske through hum poore image pull operation ko monitor krpate hai
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
}