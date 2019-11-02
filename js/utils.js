const messageTime = 1000;

function throttle(fn, wait) {
  let startTime = 0;
  return function(...arg) {
    let now = new Date();
    // 当前触发和上一次触发的时间间隔
    if(now - startTime > wait) {
      fn.apply(this, arg);
      startTime = now;
    }
  }
}

var showDialog = throttle(function(message) {
  $('#dialog').fadeIn(200);
  $('#dialog').text(message);
  setTimeout(function() {
    $('#dialog').fadeOut(500);
  }, messageTime)
}, 500);

function getTime() {
	var date= new Date();
  return `${date.getFullYear()}/${formatTime(date.getMonth() + 1)}/${formatTime(date.getDate())}
  —${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}`;
}

function formatTime(time) {
  return time >= 10 ? time : '0' + time;
}