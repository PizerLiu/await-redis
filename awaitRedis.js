
/** 
 * redis node操作(promise)
 * @auther pizer 
 * @date 2017/6/19  
 */ 

var db = {};  
var redis = require("redis");

//redis连接信息
const {redisIp,redisPort,redisName} = require(process.cwd()+'/timer/lib/config.js')

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
 * 查询string类型的数据 
 * @param key包含的键 （tweet_total_read_*）
 */  
db.redisKeys = function(key){  
    //调用unref（）将允许此程序在get命令完成后立即退出。否则只要客户端 - 服务器连接存在，客户端就会挂起
    // client.unref();
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.keys(key, function(err,result){  
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
 */  
db.redisRandomkey = function(){  
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
 * 删除哈希表 key 中的一个或多个指定字段
 * @param HashName 
 * @param key 键  
 */  
db.redisHdel = function(HashName,key){  
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.hdel(HashName, key, function(error, result){
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
db.redisHmset = function(HashName,info,expire){
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.hmset(HashName, info,function(error, result){
                if(error) {
                    reject(error);
                } else {
                    if (!isNaN(expire) && expire > 0) {
                        client.expire(key, parseInt(expire));
                    }
                    resolve(result);
                }
            });
        })
    })
}

/**
 * 查询哈希键值长度
 * @param HashName
 */
db.redisHlen = function(HashName){
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){
            client.hlen(HashName,function(error, result){
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
 * 删除键值对
 * @param key 
 */  
db.redisDel = function(key){  
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.del(key,function(error, result){
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
 * 获得加一键值
 * @param key 
 */  
db.redisIncr = function(key){  
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){  
            client.incr(key,function(error, result){
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
 * 查询TTL
 * @param key包含的键 （tweet_total_read_*）
 */
var redisTtl = function(key){
    //调用unref（）将允许此程序在get命令完成后立即退出。否则只要客户端 - 服务器连接存在，客户端就会挂起
    // client.unref();
    return new Promise(async function (resolve, reject) {
        client.select(redisName.toString(), function(error){
            client.ttl(key, function(err,result){
                if (err) {
                    reject(err)
                }
                resolve(result)
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
