
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
 const redis = require('redis');


var express = require('express');
var app = express();

// redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';
//const REDIS_HOST = '127.0.0.1';

const redisClient = redis.createClient({
	url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

redisClient.on('error', (err) => console.log('--- Redis Client Error', err));
redisClient.on('connect', () => console.log('+++ connected to Redis Client'));
redisClient.connect();



const DB_USER = 'mongodb';
const DB_PASSWD = 'mongodb';
const DB_PORT = 27017;
const DB_HOST = 'mongo'; // default ip
// const DB_HOST = '127.0.0.1'; // default ip

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}`)
	.then(() => console.log('connect to DB'))
	.catch((err) => console.log('failed to connect to DB', err))



app.get('/', function (req, res) {
	res.send('Hello World again again WOWWOWWOW!');
});

// test redis
app.get('/test-redis', async (req, res) => {
	const valuePI = await redisClient.get('PI');
	res.send(`\n\n###[PI] = ${valuePI}\n\n`);});

app.listen(PORT, function () {
	console.log('Example app li stening on port : '+ PORT);
});
