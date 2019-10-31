var canvas = document.getElementById("canvas");  // 布置画布
var context = canvas.getContext("2d");
var canvasWidth, canvasHeight;  // 画布大小
var boxHeight, boxWidth;  // 棋盘大小
var paddingX, paddingY;   // 棋盘距离外框的距离
var ceilWidth, ceilHeight;  // 格子大小
var chessSize;   // 棋子大小
var chessFontSize;  // 棋子文字大小
var mark = new Array();   // 标记棋盘上该位置是否有棋子
// 棋子对象
var redKing = new Chess("red", "帅", 0, 4);
	redGuard1 = new Chess("red", "士", 0, 3);
	redGuard2 = new Chess("red", "士", 0, 5);
	redBishop1 = new Chess("red", "相", 0, 2);
	redBishop2 = new Chess("red", "相", 0, 6);
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
var isClick = false;
var firstChess, firstChessX, firstChessY;
var turn = 0;  // 偶数表示轮到红棋落子，奇数表示轮到黑棋落子
var room;
var isOver = false;  // 为true时即游戏结束不能再移动棋子
var timer;
var onlyPopOne = false;  // 只弹出一次游戏结果，为true时即游戏结束不再弹出
$(function(){
	responsive();     // 响应式设计
	checkerboard();    // 绘制棋盘
	init();	
	$("#roomId").val("");
});
// 实时监听鼠标点击
window.onmousedown = function(event) {
	var toLeft = event.clientX - canvas.offsetLeft - paddingX;
	var toTop = event.clientY - canvas.offsetTop - paddingY;
	var chessY = Math.round(toLeft / ceilWidth);    // 所点击位置的行列
	var chessX = Math.round(toTop / ceilHeight);
	if(chessY >= 0 && chessY <= 8 && chessX >= 0 && chessX <= 9 && isOver !== true)    // 点击范围需要在棋盘中
	{
		if(isClick === false && mark[chessX][chessY] !== 0) {    // 第一次点击，需要点击棋子
			if(mark[chessX][chessY].group === "black" && turn%2 === 0){     // 错误操作，应该轮到红棋落子
				alert("轮到红棋落子");
			}
			else if(mark[chessX][chessY].group === "red" && turn%2 === 1){  // 错误操作，应该轮到黑棋落子
				alert("轮到黑棋落子");
			}
			else {
				firstChess = Object.assign(mark[chessX][chessY]);    // 记录点击的棋子
				firstChessX = chessX;
				firstChessY = chessY;
				isClick = true;        // 标记已有第一次点击		
				drawChess(mark[chessX][chessY], true);
			}
		}
		else if(isClick === true) {    	
			if(mark[chessX][chessY].group === firstChess.group){  // 第二次点击，点击到己方的棋子则无效
				isClick = false;
				alert("该位置已经有己方棋子存在了,请重新选择要移动的棋子");
			}
			else {    // 第二次点击，点击到空位或对方棋子
				if(isConformRule(firstChess, firstChess.x, firstChess.y, chessX, chessY)){
					turn++;
					if(mark[chessX][chessY].name === "将" ){
						isOver = true;
						if(room === undefined)  alert("红棋胜！" + "\n" + "双方共行了" + turn + "步棋。");   // 单独为单人模式弹出结果信息
					}
					else if(mark[chessX][chessY].name === "帅") {
						isOver = true;
						if(room === undefined)  alert("黑棋胜！" + "\n" + "双方共行了" + turn + "步棋。");
					}
					mark[chessX][chessY] = Object.assign(firstChess);  // 将棋子移动到第二次点击的位置
					mark[chessX][chessY].x = chessX;
					mark[chessX][chessY].y = chessY; 
					mark[firstChessX][firstChessY] = 0;  // 清除第一次点击的棋子的所在位置, 在init函数中mark数组已经是指向棋子对象的引用了！	
					isClick = false;  		
					if($("#roomId").val() !== undefined){  // 如果没有填写房间号则是单人模式，不需用到服务器
						send();  // 向服务器传递棋盘变化数据
					}
					changeChess();	// 重新绘制棋子位置
					playAudio();  // 播放下棋音效
				}
				else {
					isClick = false;
					alert("棋子移动不符合规则,请重新选择要移动的棋子");
				}
			}
		}
	}
}
// 播放下棋的音效
function playAudio(){
	var audio = document.getElementById("audio");
	audio.play();
} 
// 实时监听浏览器宽高变化
$(window).resize(function() {
	responsive();
	checkerboard();
	changeChess();
});
// 棋子的构造函数
function Chess(group, name, x, y) {
	this.group = group;
	this.name= name;
	this.x = x;
	this.y = y;
}
// 响应式设计
function responsive() {
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
	chessFontSize = Math.ceil(chessSize * 0.7);
	$(".box").width(canvasWidth).height(canvasHeight);
}
// 初始化mark数组
function init() {
	for(var i=0; i<=9; i++){
		mark[i] = new Array();
		for(var j=0; j<=8; j++){
			mark[i][j] = 0;
		}
	}
	redKing = new Chess("red", "帅", 0, 4);
	redGuard1 = new Chess("red", "士", 0, 3);
	redGuard2 = new Chess("red", "士", 0, 5);
	redBishop1 = new Chess("red", "相", 0, 2);
	redBishop2 = new Chess("red", "相", 0, 6);
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
	blackKing = new Chess("black", "将", 9, 4);
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
	turn = 0;
	isOver = false;
	onlyPopOne = false;
	changeChess();
}
// 根据标记数组绘制棋子
function changeChess() {
	context = canvas.getContext("2d");  // 需要重新布置画布才能及时显示棋子，画在canvas上的东西不会凭空产生消失
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	checkerboard();
	 for(var i=0; i<=9; i++){
		for(var j=0; j<=8; j++){
			drawChess(mark[i][j]);	
		}
	} 
}
// 确定进入房间
$("#btn").click(function(){
	if($("#roomId").val() === "") {
		alert("若要进行双人模式则房间号不能为空。");
	}
	room = $("#roomId").val();
	get();
});
// 重新开始
$("#new").click(function(){
	init();
	send();
});
// 向服务器传递棋盘变化数据
function send() {
	$.ajax({
		type: "post",
		url : "update.php",
		data: {
			action: "send",
			roomId: room,
			arr: JSON.stringify({
				mark: mark,
				turn: turn,
				isOver: isOver
			}) 
		}
	});
}
// 从服务器获取棋盘变化数据
function get() {
	$.ajax({
		type: "post",
		url: "update.php",
		data: {
			action: "get",
			roomId: room
		},
		success: function(response) {
			if (response) {
				let group = JSON.parse(response);
				turn = group.turn;
				mark = group.mark;
				isOver = group.isOver;
				changeChess();
				if(isOver === true){			
					var redFail = true;
					for(var i=0; i<=2; i++) {
						for(var j=3; j<=5; j++) {
							if(mark[i][j] !== 0 && mark[i][j].name === "帅"){
								redFail = false;
							}
						}
					}	
					if(redFail === true && onlyPopOne === false) {
						onlyPopOne = true;
						alert("黑棋胜！" + "\n" + "双方共行了" + turn + "步棋。");
					}   
					else if(redFail === false && onlyPopOne === false) {
						onlyPopOne = true;
						alert("红棋胜！" + "\n" + "双方共行了" + turn + "步棋。");
					}
				}
			}	
			else {   
				init();
			}
		},
		error: function(response) {
			alert(response.status);
		}
	});
}
timer = setInterval(function(){
	if(room !== undefined){
		get();
	}
},1000);