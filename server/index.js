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
      fs.writeFile(filePath, JSON.stringify(result), function(err) {
        if (err) {
          res.end(err);
        } else {
          res.end();
        }
      })
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

io.on('connection', function (socket) {
  // io.emit('msg', 'server emit');
  
  socket.on('msg1', function (data) {
    console.log('server on msg1:', data);
  });
});
