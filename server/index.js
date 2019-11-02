const server = require('http').createServer();
server.listen(88);

const io = require('socket.io')(server);
var roomObj = {};
var roomMessageObj = {};

io.on('connection', function (socket) {
  socket.on('enterRoom', function(room) {
    roomObj[room] = roomObj[room] ? roomObj[room] : [];
    // 第一个进入房间的人执红棋0，第二个进入的执黑棋1，之后进入的是观众2
    var group = (roomObj[room].length === 0 ? 0 : (roomObj[room].length === 1 ? 1 : 2));
    // 若双方有人掉线，下一个进入房间的人则顶替空缺的位置。如果双方都掉线了，则优先顶替红棋
    var haveRed = false;
    var haveBlack = false;
    for (var i=0; i<roomObj[room].length; i++) {
      if (roomObj[room][i].group === 0) {
        haveRed = true;
      } else if (roomObj[room][i].group === 1) {
        haveBlack = true;
      }
    }
    if (!haveRed) {
      group = 0;
    } else if (!haveBlack) {
      group = 1;
    }
    roomObj[room].push({
      id: socket.id,
      group
    });
    // 和客户端建立通信后给客户端发送 服务器和这个客户端的通信id，以此来区分和不同客户端的连接
    io.emit('clientInfo', {
      roomClientCount: roomObj[room].length,
      roomId: room,
      clientInfo: {
        id: socket.id,
        group
      }
    });
    if (roomMessageObj[room]) {
      io.emit('clientReciveChatMessage', JSON.stringify({
        message: roomMessageObj[room],
        room
      }))
    }
  })

  socket.on('clientChange', function (data) {
    io.emit('serverChange', data);
  });

  socket.on('disconnect', function() {
    var room = null;
    // 寻找离线客户端所在的房间，并从房间中删除
    for(var [roomId, clients] of Object.entries(roomObj)) {
      var end = false;
      // 遍历房间中的每个客户端
      for (var i=0; i<clients.length; i++) {
        if(clients[i].id === socket.id) {
          room = roomId;
          group = clients[i].group;
          end = true;
          clients.splice(i, 1);
          if (clients.length > 0 && (i === 0 || i === 1)) {
            io.emit('dropNotice', {
              group,
              roomId
            })
          } else if (clients.length === 0) {
            roomMessageObj[roomId] = '';
          }
          break;
        }
        if(end) break;
      }
    }
    if (room !== null) {
      io.emit('clientInfo', {
        roomClientCount: roomObj[room].length,
      });
    }
  });

  socket.on('clientSendChatMessage', function(data) {
    const {room, message} = JSON.parse(data);
    // 使用 /\end\n/ 来区分每一条消息，方便前端提取
    roomMessageObj[room] = roomMessageObj[room] ?  JSON.stringify(message) + '/\end\n/' + roomMessageObj[room] : JSON.stringify(message);
    io.emit('clientReciveChatMessage', JSON.stringify({
      message: roomMessageObj[room],
      room
    }))
  })
});

