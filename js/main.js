//布置画布
var canvas = document.getElementById("canvas");
canvas.width = 560;
canvas.height = 630;
var context = canvas.getContext("2d");

$(function(){
	checkerboard();    // 绘制棋盘
});
