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
var clientArr = [];

io.on('connection', function (socket) {
  clientArr.push(socket.id);
  console.log(clientArr);
  // 和客户端建立通信后给客户端发送 服务器和这个客户端的通信id，以此来区分和不同客户端的连接
  io.emit('clientInfo', {
    curClientId: socket.id,
    clientCount: clientArr.length
  });

  socket.on('clientChange', function (data) {
    io.emit('serverChange', data);
  });

  socket.on('disconnect', function() {
    console.log('client断开连接了');
    console.log(socket.id);
    clientArr = clientArr.filter(function(val) {
      return val !== socket.id;
    })
    console.log(clientArr);
    io.emit('clientInfo', {
      curClientId: socket.id,
      clientCount: clientArr.length
    });
  })
});

