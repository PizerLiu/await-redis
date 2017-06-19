# await-redis
promise封装的redis

//key 键,value 值,expire (过期时间,单位秒;可为空，为空表示不过期) -> 添加string类型的数据 
await redisSet(key, value, expire)

//key 键 -> 查询string类型的数据
await redisGet(key)

//key 键 -> 查询key是否存在
await redisExists(key)

//随机返回一个键
await redisRandomkey()
