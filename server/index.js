const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const querystring = require('querystring');

const app = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const routeUrl = url.parse(req.url).pathname;

  if (routeUrl === '/set') {
    var postData = '';
    req.on('data', function(data) {
      postData += data;
    });
    req.on('end', function() {    
      const result = querystring.parse(postData);
      const filePath = path.join(__dirname, './boardInfo', './' + result.roomId + '.txt');

      fs.access(filePath, function(err) {
        if (err) {
          fs.writeFile(filePath, JSON.stringify(result), function(err) {
            if (err) {
              res.end(err);
            } else {
              res.end(JSON.stringify({roomExist: false}));
            }
          })
        } else {
          res.end(JSON.stringify({roomExist: true}));
        }
      });

    });
  } else if (routeUrl === '/get') {
    const { roomId } = url.parse(req.url, true).query;
    const filePath = path.join(__dirname, './boardInfo', './' + roomId + '.txt');
    
    fs.readFile(filePath, function(err, data) {
      if (err) {
        res.end(err);
      } else {
        res.end(data.toString());
      }
    })
  } else {
    res.end('404');
  }
}).listen(88);


const io = require('socket.io')(app);
var roomObj = {};

io.on('connection', function (socket) {
  socket.on('createRoom', function(room) {
    roomObj[room] = roomObj[room] ? roomObj[room] : [];
    // 第一个进入房间的人执红棋，第二个进入的执黑棋
    const group = (roomObj[room].length === 0 ? 0 : (roomObj[room].length === 1 ? 1 : null));
    roomObj[room].push({
      id: socket.id,
      group
    });
    console.log('roomObj');
    console.log(roomObj);
    // 和客户端建立通信后给客户端发送 服务器和这个客户端的通信id，以此来区分和不同客户端的连接
    io.emit('clientInfo', {
      roomClientCount: roomObj[room].length,
      clientInfo: {
        id: socket.id,
        group
      }
    });
  })

  socket.on('clientChange', function (data) {
    io.emit('serverChange', data);
  });

  socket.on('disconnect', function() {
    console.log('client断开连接了');
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
          }
          break;
        }
        if(end) break;
      }
    }
    console.log(roomObj);
    if (room !== null) {
      io.emit('clientInfo', {
        roomClientCount: roomObj[room].length,
      });
    }
  })
});

