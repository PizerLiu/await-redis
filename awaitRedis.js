
var db = {};  
var redis = require("redis");  

//redis连接信息
var redisIp = "127.0.0.1"
var redisPort = "6379"
var redisName = "0"

//redis连接
var client = redis.createClient(redisPort, redisIp);
//redis校验
//client.auth(password[, callback])  

client.on("error", function (err) {  
  console.log("Error :" , err);  
});  
  
client.on('connect', function(){  
  console.log('Redis连接成功.');  
})  

/** 
 * 添加string类型的数据 
 * @param key 键 
 * @params value 值  
 * @params expire (过期时间,单位秒;可为空，为空表示不过期) 
 */  
db.redisSet = function(key, value, expire){  
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.set(key, value, function(err, result){  
                if (err) {   
                    reject(err)
                }  
          
                if (!isNaN(expire) && expire > 0) {  
                    client.expire(key, parseInt(expire));  
                }  
                resolve(result)
            })
        }) 
    }) 
}  
  
/** 
 * 查询string类型的数据 
 * @param key 键 
 */  
db.redisGet = function(key){  
    //调用unref（）将允许此程序在get命令完成后立即退出。否则只要客户端 - 服务器连接存在，客户端就会挂起
    // client.unref();
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.get(key, function(err,result){  
                if (err) {  
                    reject(err)
                }        
                resolve(result)  
            }); 
        })
    }) 
}  

/** 
 * 查询key是否存在 
 * @param key 键  
 */  
db.redisExists = function(key){  
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.exists(key, function (err, reply) {
                if (err) {  
                    reject(err) 
                }       
                resolve(reply)   // 键存在，返回1，否则返回0
            });
        })
    })
} 

/** 
 * 随机返回一个键
 * @param key 键 
 */  
db.redisRandomkey = function(key){  
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.randomkey(function (err, reply) {
                if (err) reject(err);
                resolve(result)     // 随机返回一个键
            });
        })
    })
} 

/** 
 * 查询哈希中的key
 * @param HashName 
 * @param key 键  
 */  
db.redisHmget = function(HashName,key){  
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.hmget(HashName, key, function(error, result){
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
    })
} 

/** 
 * 查询哈希中的所有键值对
 * @param HashName 
 */  
db.redisHgetall = function(HashName){  
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.hgetall(HashName, function(error, result){
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
    })
} 

/** 
 * 存储哈希键值对
 * @param HashName 
 * @param info （object）
 */  
db.redisHmset = function(HashName,info){  
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.hmset(HashName, info,function(error, result){
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
    })
} 

/** 
 * 断开redis 
 */  
db.redisQuit = function(){  
    client.quit();
}  

module.exports = db;  
