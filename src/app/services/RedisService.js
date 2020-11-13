const redis = require('redis');
const redisConfig = require('../../config/redis');
const handleEncryption = require('../helpers/handleEncryption');

const client = redis.createClient(redisConfig);

class RedisService {

    async storeToken(key,value) {
        
        const hashKey = await handleEncryption.hash(key); // hash the email
        const hashValue = await handleEncryption.hash(value); // hash the value

        return new Promise((resolve,reject) => {

            client.set(hashKey,hashValue, (err,reply) => {
                if(err) reject(err);
                resolve(reply);
            });
   
        });

    }
    
    async getToken(key,value) {

        const hashKey = await handleEncryption.compare(key,value); // hash the email

        return new Promise((resolve,reject) => {
            client.get(hashKey, (err,reply) => {
                if(err) reject(err);
                const hashValue = await handleEncryption.compare(reply,value);
                resolve(hashValue);

            });
            
        })

    }

    store(key,column,row) {

        return new Promise((resolve,reject) => {

         client.hset(key, [column, row], (err,reply) => {
                if(err) reject(err);
                resolve(reply);

            });

        });

    }

    keys() {

        const keysArray = [];

        return new Promise((resolve,reject) => {
            client.keys('*', (err, keys) => {
                if (err) reject(err);
                for(var i = 0, len = keys.length; i < len; i++) { keysArray.push(keys[i]); } 
                resolve(keysArray);

            })
        });
        
    }

    retrieve(key) {

        return new Promise((resolve,reject) => {

            client.hgetall(key, (err,reply) => {
                if(err) reject(err);
                resolve(reply);

            });
    
        })

    }

    flushall() {

        return new Promise((resolve,reject) => {

            client.flushall((err,reply) => {
                if(err) reject(err);
                resolve(reply);

            });

        });

    }

    delete(key, column, row) {
        
        return new Promise((resolve,reject) => {

            client.hdel(key, [column, row], (err,reply) => {
                if(err) reject(err);
                resolve(reply);

            });

        });

    }
    
}

module.exports = new RedisService();
