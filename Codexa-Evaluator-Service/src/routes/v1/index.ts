import express from "express";
import { pingCheck } from "../../controllers/pingController";

const v1Router=express.Router();

v1Router.get('/ping',pingCheck);

export default v1Router;
/**
 * Like even hostart usues the logic of message quueue
 * 
 * 
 * what's the benefirts of message queue:
 *  
 *  -It provides you asynchronous communication
 *  -You can scale your app
 *  -Message queue also helps us to maintain retyr mechanism
 *  -Retrying mechanism is already there
 *  -Message queue can also helps you to laod balance like we can park our request 
 * 
 * 
 * ye queue and hashtable are the most used in terms of backend infra
 * 
 * so we have to integrate redis based message queue in our project, so we will use bullmq 
 * 
 * BullMQ is very easy to use ad it is a nodejs library that implements a fast androbust queue system on top of redis
 * we will use bullmq and under the hood bullmq uses the redis infrastricture bebhing the scene
 * 
 * it'll gonna have producer and consumer kind of thing  
 * 
 * 
 * const myQueue=new Queueu['foo']; //ye queue create kro foo name ka 
 * and job e jab tum push kro to first argument is name and second argument is our object which i would like to push as an object
 * 
 * 
 * inside that object there could javascript code withs ome data
 * 
 * so jab mera consumer read krega to usko ye cheez visible hoga
 * in the world of bullmq 
 * consumer can be called as processor or worker
 * 
 * so we create a new worker  with a name and we give the callback in which we give the mechanism wlike when the job is gong to be readed from the queue what should happen, like ye hum us callback me likhte hai 
 * 
 * prodcuer bhi some kind of code hogas , as consumer bhi some kind of code hoga 
 * producer will add object to the queue and consumer will consume that object from queue
 * 
 * so what are the dependency we needed??
 * we needed bullmq and ioredis , but pehle humko redis install krna pdega 
 * 
 * redis is a message broker that handle the messaging infrastrcuture
 * -
 * simply do 
 *           sudo apt install redis
 * aur phir run krne ke liye redis-server krke dekhlo ki configure hua hai ki nahi and since mai side me dusre project banaraha hu jo ki ye mera redis use krrha hai so mere me already sue me hai so we have to stop that working 
 * so for that 
 *            sudo systemctl stop redis
 * 
 * npm install bullmq ioredis
 */