var canvas = document.getElementById("canvas");  // 布置画布
var context = canvas.getContext("2d");
var canvasWidth, canvasHeight;  // 画布大小
var boxHeight, boxWidth;  // 棋盘大小
var paddingX, paddingY;   // 棋盘距离外框的距离
var ceilWidth, ceilHeight;  // 格子大小
var chessSize;   // 棋子大小
var chessFontSize;  // 棋子文字大小
var mark = new Array(10);   // 标记棋盘上该位置是否有棋子
 // 棋子对象
var redKing = new Chess("red", "帅", 0, 4);
	redGuard1 = new Chess("red", "士", 0, 3);
	redGuard2 = new Chess("red", "士", 0, 5);
	redBishop1 = new Chess("red", "象", 0, 2);
	redBishop2 = new Chess("red", "象", 0, 6);
	redKnight1 = new Chess("red", "马", 0, 1);
	redKnight2 = new Chess("red", "马", 0,7);
	redRook1 = new Chess("red", "车", 0, 0);
	redRook2 = new Chess("red", "车", 0, 8);
	redCannon1 = new Chess("red", "炮", 2, 1);
	redCannon2 = new Chess("red", "炮", 2, 7);
	redPawn1 = new Chess("red", "兵", 3, 0);
	redPawn2 = new Chess("red", "兵", 3, 2);
	redPawn3 = new Chess("red", "兵", 3, 4);
	redPawn4 = new Chess("red", "兵", 3, 6);
	redPawn5 = new Chess("red", "兵", 3, 8);
var blackKing = new Chess("black", "将", 9, 4);
	blackGuard1 = new Chess("black", "士", 9, 3);
	blackGuard2 = new Chess("black", "士", 9, 5);
	blackBishop1 = new Chess("black", "象", 9, 2);
	blackBishop2 = new Chess("black", "象", 9, 6);
	blackKnight1 = new Chess("black", "马", 9, 1);
	blackKnight2 = new Chess("black", "马", 9,7);
	blackRook1 = new Chess("black", "车", 9, 0);
	blackRook2 = new Chess("black", "车", 9, 8);
	blackCannon1 = new Chess("black", "炮", 7, 1);
	blackCannon2 = new Chess("black", "炮", 7, 7);
	blackPawn1 = new Chess("black", "卒", 6, 0);
	blackPawn2 = new Chess("black", "卒", 6, 2);
	blackPawn3 = new Chess("black", "卒", 6, 4);
	blackPawn4 = new Chess("black", "卒", 6, 6);
	blackPawn5 = new Chess("black", "卒", 6, 8);
$(function(){
	responisive();     // 响应式设计
	checkerboard();    // 绘制棋盘
	init();
	// 实时监听浏览器宽高变化
	$(window).resize(function() {
		responisive();
		checkerboard();
		init();
	});
});
// 棋子的构造函数
function Chess(group, name, x, y) {
	this.group = group;
	this.name= name;
	this.x = x;
	this.y = y;
}
// 响应式设计
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
	ceilWidth = canvasWidth / 9;
	ceilHeight = canvasHeight / 10;
	paddingX =  ceilWidth / 2;
	paddingY =  ceilHeight / 2;
	boxWidth = canvasWidth - paddingX * 2;
	boxHeight = canvasHeight - paddingY * 2 ;
	chessSize = Math.ceil(ceilWidth * 0.4);
	chessFontSize = Math.ceil(chessSize*0.8);
	$(".box").width(canvasWidth).height(canvasHeight);
}
// 初始化mark数组
function init() {
	for(var i=0; i<=9; i++){
		mark[i] = new Array(9);
		for(var j=0; j<=8; j++){
			mark[i][j] = 0;
		}
	}
	mark[0][0] = redRook1;
	mark[0][1] = redKnight1;
	mark[0][2] = redBishop1;
	mark[0][3] = redGuard1;
	mark[0][4] = redKing;
	mark[0][5] = redGuard2;
	mark[0][6] = redBishop2;
	mark[0][7] = redKnight2;
	mark[0][8] = redRook2;
	mark[2][1] = redCannon1;
	mark[2][7] = redCannon2;
	mark[3][0] = redPawn1;
	mark[3][2] = redPawn2;
	mark[3][4] = redPawn3;
	mark[3][6] = redPawn4;
	mark[3][8] = redPawn5;
	mark[9][0] = blackRook1;
	mark[9][1] = blackKnight1;
	mark[9][2] = blackBishop1;
	mark[9][3] = blackGuard1;
	mark[9][4] = blackKing;
	mark[9][5] = blackGuard2;
	mark[9][6] = blackBishop2;
	mark[9][7] = blackKnight2;
	mark[9][8] = blackRook2;
	mark[7][1] = blackCannon1;
	mark[7][7] = blackCannon2;
	mark[6][0] = blackPawn1;
	mark[6][2] = blackPawn2;
	mark[6][4] = blackPawn3;
	mark[6][6] = blackPawn4;
	mark[6][8] = blackPawn5;
	for(var i=0; i<=9; i++){
		for(var j=0; j<=8; j++){
			drawChess(mark[i][j]);
		}
	}
}

