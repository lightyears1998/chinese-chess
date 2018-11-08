// 布置画布
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasWidth, canvasHeight;  // 画布大小
var boxHeight, boxWidth;  // 棋盘大小
var paddingX, paddingY;   // 棋盘距离外框的距离
$(function(){
	responisive();     // 响应式设计
	checkerboard();    // 绘制棋盘
	// 实时监听浏览器宽高变化
	$(window).resize(function() {
		responisive();
		checkerboard();
	});
});

function responisive() {
	// 获取浏览器可使用的宽高
	var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	// 通过获取浏览器宽高中的较小值来设置棋盘大小
	var minLength = Math.min(browserWidth, browserHeight) * 0.9;
	canvas.height = Math.ceil(minLength);
	canvas.width = Math.ceil(minLength / 9 * 8);
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	paddingX =  canvasWidth * 0.066;
	paddingY =  canvasHeight * 0.059;
	boxWidth = canvasWidth - paddingX*2;
	boxHeight = canvasHeight -paddingY*2 ;
	$(".box").width(canvasWidth).height(canvasHeight)
   // alert(canvasWidth + " " + canvasHeight);
	
}