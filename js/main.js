<<<<<<< HEAD
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
=======
var context;
var boxWidth, boxHeight;

// 计算绘图所需的参数
function calculateArgs() {
	// 获取浏览器可使用宽高
	var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	// 布置画布
	var canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	// 响应式设计宽高
	var maxLength = Math.min(browserWidth, browserHeight) * 0.8;  // 设定canvas的最大长度为浏览器的宽高中较小值的80% 
	canvas.height = Math.ceil(maxLength);
	canvas.width = Math.ceil(maxLength / 9 * 8);
	boxHeight = canvas.height;
	boxWidth = canvas.width;
	
	/*
	if(browserWidth / browserHeight >= 1){       // 当前使用电脑，根据高度来设置棋盘宽高
		canvas.height = ;
		boxHeight = canvas.height;
		canvas.width = Math.ceil(boxHeight * 8 / 9);
		boxWidth = canvas.width;
	}	
	else {                       // 当前使用手机，根据宽度来设置棋盘宽高
		canvas.width = Math.ceil(browserWidth * 8 / 9);
		boxWidth = canvas.width;
		canvas.higth = Math.ceil(boxWidth * 9 / 8);
		boxHeight = canvas.height;
	}*/
	
	$(".box").width(boxWidth).height(boxHeight);
}

$(function(){
	calculateArgs();
	checkerboard();    // 绘制棋盘
//	chessPiecesInit();

	$(window).resize(function () {
		calculateArgs();
		checkerboard();    // 绘制棋盘
	});
});
>>>>>>> d6e8097d9caf425263fce2e1633551f5ad80adfa
