'use strict';

const net = require('net');

const onData = (data, ...args) => {
  console.dir({
    args,
    event: 'data',
  });
  console.log(data);
};

const onConnection = (...args) => {
  console.dir({
    args,
    event: 'connection',
  });
};

const onListening = (...args) => {
  console.dir({
    args,
    event: 'listening',
  });
};

const server = net.createServer(socket => {
  console.dir(socket.address());
  console.dir({
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remoteFamily: socket.remoteFamily,
    remotePort: socket.remotePort,
    bufferSize: socket.bufferSize,
    connections: server.getConnections((err, count) => {
      console.log('err', err);
      console.log('count', count);
    }, { depth: 10 }),
  });
  //socket.setNoDelay(true);
  socket.write('💗');
  socket.on('data', onData);
  socket.on('connection', onConnection);
  socket.on('listening', onListening);
  socket.on('error', err => {
    console.log('Socket error', err);
  });
}).listen(2000);

server.on('error', err => {
  console.log('Server error', err);
});
