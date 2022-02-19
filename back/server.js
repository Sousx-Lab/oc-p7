const { createServer } = require('http');
const app = require('./app');


const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

const server = createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address()
  let bind;
  if(typeof address === 'string'){
    bind = 'pipe ' + address;
  }else if(address.family === "IPv6"){
    bind = "http://localhost:"+port+"/api"
  }
  console.log(`\x1b[42m 🚀 API Server start listening on: ${bind}\x1b[40m\n`);
});

server.listen(port);