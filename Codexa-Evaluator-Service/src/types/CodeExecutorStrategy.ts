export default interface CodeExecutorStrategy {
    execute(code: string, inputTestCase: string, outputTestCase: string) : Promise<ExecutionResponse>;
};

export type ExecutionResponse = {output:string, status: string};

/**
Interface kya bolraha hai?yaha pe

ye kehraha hai ki 
"Jo bhi class CodeExecutorStrategy implement karegi,uske pass execute() method hona chahiye"

mtlb code->user ka code
inputTestCase->test case input
outputTestCase->expected output

aur ye promise return krega , qki code execution asynchornous hai
Promise<ExecutionResponse> mtlb function turant nahi dega 
future mein dega 


Now the question is ki ye design pattern kyu?

: like iska answer hai ki maan lo tumahre pass multiple languages hai 

PythonExecutor
CppExecutor
JavaExecutor

Sabko same interface follow krna padega:
execute(code,input,output)
isliye baad mein code likh skte ho

const executor:CodeExecutorStrategy=new PythonExecutor();
await executor.execute(...);

au kal 
const execute:CodeExecutorStartegy=new CppExecutor();

kar do, baaki code change nahi krna pdega mereko ,


basically yaha pe "Stategy Design Pattern" ka basic use kiye hai hum

 */