const mongodb = require('mongodb');
const config = require('../config');

const user = config.db.user;
const pwd = config.db.pwd;
const host = config.db.host;
const port = config.db.port || '27017';
const name = config.db.name;
const url = host + ':' + port + '/' + name;
const connectionURL = 'mongodb://' + user + ':' + pwd + '@' + url;

async function loadBlogsCollection(){
    const client = await mongodb.MongoClient.connect(connectionURL, {useNewUrlParser: true});
    return client.db('vue_express').collection('blogs');
}


async function loadNewsCollection(){
  const client = await mongodb.MongoClient.connect(connectionURL, {useNewUrlParser: true});
  return client.db('vue_express').collection('news');
}

exports.loadBlogsCollection = loadBlogsCollection;
exports.loadNewsCollection = loadNewsCollection;