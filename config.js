'use strict';
const config = module.exports;
const PRODUCTION = process.env.NODE_ENV === 'production';

config.express = {
    port : process.env.EXPRESS_PORT || 3000,
    host : '0.0.0.0'
};

config.mongoDB = {
    port : process.env.MONGODB_PORT || 27017,
    host : process.env.MONGODB_HOST || 'localhost'
};

if (PRODUCTION){
    config.ip = '127.0.0.1'
}