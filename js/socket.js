var socket = null;
var clientInfo = null;

function establishWS() {
  socket = io('ws://localhost:88');
  socket.on('connect', function() {
    console.log('成功连接服务器');
    socket.emit('createRoom', room);
  })

  socket.on('disconnect', function(a) {
    console.log('和服务器断开连接了');
    clientInfo = null;
    socket = null;
  })

  // 获取当前客户端和服务器的通信id
  socket.on('clientInfo', function(obj) {
    if (clientInfo === null) {
      clientInfo = obj.clientInfo;
    }
    console.log(clientInfo);
    $('#peopleCount').text(obj.roomClientCount);
  })
  
  // 服务器有更新，接受新的棋盘信息
  socket.on('serverChange', function(data) {
    console.log("recive serverChange");
    mark = JSON.parse(data.mark);
    turn = data.turn;
    isOver = data.isOver;
    console.log(data);
    changeChess();
  });

  // 若下棋的两个人其中一方下线了，则出现弹框通知
  socket.on('dropNotice', function(data) {
    const { group, roomId } = data;
    if (roomId === room) {
      showDialog(`${group ? '黑棋' : '红棋'}已下线`);
    }
  })
}

// 判断客户端和服务器是否有连接
function judgeConnecting() {
  return socket !== null;
}

// 移动棋子后通知服务器
function callServer(data) {
  if (judgeConnecting()) {
    socket.emit('clientChange', data);
  }
}

function closeWs(e) {
  if (judgeConnecting()) {
    socket.close();
  }
}