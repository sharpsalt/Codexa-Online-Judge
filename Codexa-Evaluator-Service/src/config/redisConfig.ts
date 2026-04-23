import redis from "ioredis";
import ServerConfig from './serverConfig'

const redisConfig={
    port:ServerConfig.REDIS_PORT,
    host:ServerConfig.REDIS_HOST,
    maxRetriesPerRequest:null
}

const redisConncetion=new redis(redisConfig);
export default redisConncetion;

/**
 * 
 */