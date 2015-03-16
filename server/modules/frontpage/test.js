require("babel/register");

var http = require('http').createServer().listen(3000);


client = require('./client/moreinfo.client');


client.info('870970-basis:23959798'.split(':').pop()).then(console.log).catch(console.error);
