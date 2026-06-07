export default interface DockerStreamOutput {
    stdout: string;
    stderr: string;
// eslint-disable-next-line semi
};
//basically hume pata ki 2 hi output aa sakta hai ya to code execute hoga ya error aayega so 
//2 diffrent type is inside it ,stdout and stderr