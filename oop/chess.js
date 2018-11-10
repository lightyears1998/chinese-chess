'use strict'

// 初始化游戏
document.addEventListener('DOMContentLoaded', function (event) {
	createCanvas();
});

// 顺序层叠3层Canvas
function createCanvas() {
	let node_game = document.getElementById('chess-game-div');
    if (node_game) {
        ['cvs-chessboard', 'cvs-chesses', 'cvs-feedback'].forEach(function (cvs_name) {
            let cvs = document.createElement('canvas');
            cvs.setAttribute('id', cvs_name);
            cvs.setAttribute('class', 'chess-game-canvas');
            node_game.appendChild(cvs);
        });
    }
}

// 棋盘层
function chessBoard() {
	this.boarder;  // 棋盘边界
	this.horizontalLines;  // 棋盘上横线
	this.cross;            // 棋盘上特殊位置的标记
	this.verticalLines;    // 棋盘上的水平线
}

// 棋子层
function chesss() {
	
}

// 反馈层
function Feedback() {
	
}

// 象棋游戏对象
function chessGame() {
	if (!(this instanceof chessGame)) {
		return new chessGame();
	}
	
	this.cell;     // 单位格子的长度
	
	// 将逻辑坐标转换为像素坐标
	this.logicCoordinate2PixelCoordinate = function () {
		
	}
	
	// 将像素坐标转换为逻辑坐标
	this.PixelCoordinate2LogicCoordinate = function () {
		
	}
}
