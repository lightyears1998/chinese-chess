// 获取浏览器可使用宽高
var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
// 布置画布
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
// 响应式设计宽高
if(browserWidth / browserHeight >= 1){       // 当前使用电脑，根据高度来设置棋盘宽高
	canvas.height = Math.ceil(browserHeight * 8 / 9);
	var boxHeight = canvas.height;
	canvas.width = Math.ceil(boxHeight * 8 / 9);
	var boxWidth = canvas.width;
}	
else {                       // 当前使用手机，根据宽度来设置棋盘宽高
	canvas.width = Math.ceil(browserWidth * 8 / 9);
	var boxWidth = canvas.width;
	canvas.higth = Math.ceil(boxWidth * 9 / 8);
	var boxHeight = canvas.height;
}

alert(browserWidth + " " + browserHeight + " "+ boxWidth + " " + boxHeight);

$(".box").width(boxWidth ).height(boxHeight );

$(function(){
	checkerboard();    // 绘制棋盘
//	chessPiecesInit();
});