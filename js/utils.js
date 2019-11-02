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
    $('#dialog').fadeOut(700);
  }, messageTime)
}, 500);

function getTime() {
	var date= new Date();
	var year= date.getFullYear();
	var month= formatTime(date.getMonth() + 1);
	var day= formatTime(date.getDate());
  var s = Math.floor(date.getSeconds());
  var m = Math.floor(date.getMinutes() + s / 60);
  var h = Math.floor(date.getHours() % 12 + m / 60);
  h = formatTime(h);
  m = formatTime(m);
  s = formatTime(s);
  return `${year}/${month}/${day}—${h}:${m}:${s}`;
}

function formatTime(time) {
  return time >= 10 ? time : '0' + time;
}