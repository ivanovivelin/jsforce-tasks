#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import * as utils from './utils';
import * as prescripts from './pre-scripts/index';
import * as postscripts from './post-scripts/index';
import debugLib from 'debug';
import http from 'http';

const debug = debugLib('your-project-name:server');

const args = process.argv.slice(2);
const parseArgs = require('minimist');
const argv = parseArgs(args);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Run Core Scripts
 */

 async function asyncTasks(options) {
  try {
    const connResult = await utils.connect(options);
    const preScriptsResult = await prescripts.runAll(connResult);
    console.log(`Finished running pre-scripts ${preScriptsResult}`);
    //const postScriptsResult = await postscripts.runAll(connResult);
    process.exitCode = 1;
  } catch (err) {
    console.log('Error running Tasks => ', err);
  }
 }

 asyncTasks(argv);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

 /**
  * @description Event listener for HTTP server "error" event.
  * @param {*} error 
  */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(`Express Server Listening on ${bind}`);
  debug('Listening on ' + bind);
}


process.on('unhandledRejection', (err) => { 
  console.error(err)
  process.exit(1)
});