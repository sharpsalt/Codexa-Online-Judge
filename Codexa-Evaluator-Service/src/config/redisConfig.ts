import ServerConfig from './serverConfig'

const redisConnection = {
    port: ServerConfig.REDIS_PORT,
    host: ServerConfig.REDIS_HOST,
    maxRetriesPerRequest: null
};

export default redisConnection;

/**
 * Export a plain config object instead of an ioredis instance.
 * BullMQ accepts a ConnectionOptions config object and creates 
 * its own internal Redis connection from it. This avoids the 
 * duplicate ioredis version conflict between the top-level 
 * ioredis package and bullmq's bundled ioredis.
 */