const redis = require("redis");
const { promisify } = require("util");

const redisClient = redis.createClient();

redisClient.on("error", function(error) {
    console.error(error);
});

redisClient.get = promisify(redisClient.get);
// redisClient.hget = promisify(redisClient.hget);

module.exports = redisClient;