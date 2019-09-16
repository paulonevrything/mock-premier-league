const redis = require('redis');
const client = redis.createClient(10829, 'ec2-34-204-150-189.compute-1.amazonaws.com');
client.auth('p0de794f07a273a20505262d7fb648f5af870824ad3f097cecb7246b3e125502d');

const server = 'ds339177.mlab.com:39177';
const database = 'heroku_thd7xmws';
const user = 'heroku_thd7xmws';
const password = 'pj0j438nasef29lvt4m38t6ejk';

module.exports = {
    api: {
        port: process.env.PORT || 4000
    },
    db: {
        url: process.env.DB_URL || `mongodb://${user}:${password}@${server}/${database}`
    },
    BCRYPT_HASH_ROUNDS: 10,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    redisClient:  client
}