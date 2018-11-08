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
