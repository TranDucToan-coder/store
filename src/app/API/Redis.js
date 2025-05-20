const redis = require("redis");
const mysql2 = require("mysql2/promise");


const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Toan2003@@',
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const redisClient = redis.createClient({
    url: 'redis://default:sJJsgWUrgzobtZa2ZkGw55FbJN8oSMX4@redis-17831.c1.us-east1-2.gce.redns.redis-cloud.com:17831'
});

redisClient.on('connect', () => {
    console.log("Connected to Redis!");
})
redisClient.on("error", (error) => {
    console.error(`Failed because ${error}`);
})
const fetchData = async (key, query, params) => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
    const redisData = await redisClient.get(key);
    if (redisData) {
        console.log('Data retrieved from Redis');
        return JSON.parse(redisData);
    }
    try {
        console.log(".....")
        const [results] = await pool.query(query, params);
        await redisClient.set(key, JSON.stringify(results), {
            EX: 3600
        });
        return results;
    } catch (error) {
        throw error;
    }
};
module.exports = fetchData;

