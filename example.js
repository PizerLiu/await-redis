const redis = require('./awaitRedis.js')

var startTimer = async function(){
	console.log(await redis.redisSet("liu", "pizer", ""))
}

startTimer();

// redis.redisSet("liu1", "pizer", "", function(err, result){
// 	console.log("1>",err,result)
// })

// redis.redisGet("liu", function(err, result){
// 	console.log("2>",err,result)
// })

// redis.redisExists("liu",function(err, result){
// 	console.log("3>",err,result)
// })
