#!/usr/bin/env node

/**
 * Module dependencies.
 */

const debug = require("debug")("remeet:server");
const http = require("http");
const https = require("https");
const fs = require("fs");
const app = require("../app");

const db = require("../loader/sequelize");
const config = require("../config/express");

/**
 * Normalize a port into a number, string, or false.
 * @param {Integer} val Port
 * @return {Integer} Port value
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
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
 * Get port from environment and store in Express.
 */
const port = normalizePort(config.port);
app.set("port", port);

/**
 * Create HTTPS server.
 */
let server;
if (config.ssl === true) {
  server = https.createServer(
    {
      key: fs.readFileSync(config.credentials.key),
      cert: fs.readFileSync(config.credentials.cert),
    },
    app
  );
} else {
  server = http.createServer(app);
}

/**
 * Event listener for HTTP server "error" event.
 * @param {Object} error Error HTTP
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
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
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 * @param {Object} serv Http server
 */
async function main(serv) {
  try {
    await db.sequelize.sync();

    serv.listen(port);
    serv.on("error", onError);
    serv.on("listening", onListening);
  } catch (err) {
    debug("Error:", err);
  }
}
main(server);
