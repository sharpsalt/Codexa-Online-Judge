import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants"; //8 bytes hai


export default function decodeDockerStream(buffer: Buffer):DockerStreamOutput{
    let offset=0; //This variable keeps track of the current position in the buffer while parsing
    //The output that will store the accumulated stdout and stderr output as strings
    const output: DockerStreamOutput={stdout:'' , stderr:''}; 
    //Loop until offset reaches end of the buffer
    while(offset<buffer.length){
        //channel is read from buffer and has value of type of stream
        const typeOfStream=buffer[offset];//current chunk ka byte 1=stdout,2=stderr hota hai ismein
        //This length variable hold the length of the value 
        //We will read this variable on an offset of 4 bytes from the start of the chunk
        const length=buffer.readUint32BE(offset + 4);
        //as now we have read the header,we can move forward to the value of the chunk
        offset+=DOCKER_STREAM_HEADER_SIZE;//yaha se we will ski[ the header]
        //docker length ko Big Endian format me store krta hai 
        //mtlb dekho pehle 
        //[HEADER][DATA]
        //   ^

        //pehle header pe pointer tha ab pointer actual text pe aagaya hai it means 
        //[HEADER][DATA]
        //          ^
        if(typeOfStream===1){
            // stdout stream
            output.stdout+=buffer.toString('utf-8', offset, offset + length);
        } else if(typeOfStream === 2) {
            // stderr stream
            output.stderr+=buffer.toString('utf-8', offset, offset + length);
        }

        offset += length; // move offset to next chunk
        //[header][Hello][header][Error]
        //           ^
        //[header][Hello][header][Error]
        //                         ^
    }

    return output;
}
/**
 * Docker jab stout/stderr bhejte hai,to woh direct text nahi bhejta, instead wo multiplexed stream format bhejta hai
 * mtlb 
 * [header][data] aisa format mein
 * 
 * mera ye function basically us binary format ko decode krke normal json format me krenge 
 * {
 *   stdout:"...",
 *   stderr:"..."
 * } banata hai 
 * 
 * 
 * first import is for type 
 * 2nd import is for Docker stream header size, like agar tum utils me dekhoge to wo 8 bytes ka hai 
 * jisme distribution is like this 
 * 
 1 bytes->stream type
 3 bytes->unused
 4 bytes->payload length
 */