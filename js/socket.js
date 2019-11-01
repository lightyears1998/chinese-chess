var wsId = '';
var socket = null;

function establishWS() {
  socket = io('ws://localhost:88');
  socket.on('connect', function() {
    console.log('和服务器链接成功');
  })

  socket.on('disconnect', function(a) {
    console.log('和服务器断开连接了');
    socket = null;
    wsId = '';
  })
  
  // 服务器有更新，接受新的棋盘信息
  socket.on('serverChange', function(data) {
    console.log("recive serverChange");
    mark = JSON.parse(data.mark);
    console.log(mark);
    changeChess();
  });

  // 获取当前客户端和服务器的通信id
  socket.on('clientInfo', function(obj) {
    wsId = wsId ? wsId : obj.curClientId;
    $('#peopleCount').text(obj.clientCount);
    console.log("wsId: ", wsId);
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
  　var e = window.event||e;  
　　e.returnValue=("确定离开当前页面吗？");

  if (judgeConnecting()) {
    console.log('unload');
    console.log(socket);
    socket.close();
  }
}