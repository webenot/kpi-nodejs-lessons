'use strict';

const socket = new WebSocket('ws://127.0.0.1:2000', 'tcp');

socket.onmessage = (event) => {
  console.log(event);
};

socket.onmessage = (event) => {
  console.log(event);
};

socket.onerror = (event) => {
  console.log('Ошибка подключения');
  console.error(event);
};

socket.onopen = (event) => {
  console.log('Соединение открыто...');
  if (!socket.readyState) {
    setTimeout(() => {
      socket.send('💋');
    }, 200);
  } else {
    socket.send('💋');
  }
  console.log(event.data);
};

socket.onclose = (event) => {
  console.log('Соединение разорвано', event);
};

socket.close();
