'use strict';

var GAME;

// 初始化游戏
document.addEventListener('DOMContentLoaded', function (event) {
	GAME = new ChessGame('chess-game');
});

function ChessGameCanvas(game) {
	this.cvs_chessboard;
	this.cvs_chesses;
	this.cvs_feedback;
	
	// 初始化工作
	{
		['cvs-chessboard', 'cvs-chesses', 'cvs-feedback'].forEach(function (cvs_name) {
			let cvs = document.createElement('canvas');
			cvs.setAttribute('id', `${game.node.id}-${cvs_name}`);
			cvs.setAttribute('style', 'position: absolute; width: 100%; height: 100%;');
			game.node.appendChild(cvs);
		});
		this.cvs_chessboard = document.getElementById(`${game.node.id}-cvs-chessboard`);
		this.cvs_chesses = document.getElementById(`${game.node.id}-cvs-chesses`);
		this.cvs_feedback = document.getElementById(`${game.node.id}-cvs-feedback`);
	}
}

// 象棋游戏对象
function ChessGame(node_id) {
	if (!(this instanceof ChessGame)) {
		return new ChessGame(node_id);
	}
	
	// 游戏在DOM树中的节点
	this.node;
	
	// 游戏画布
	this.canvas;
	
	// 初始化工作
	{
		this.node = document.getElementById(node_id);
		if (this.node) {
			this.canvas = new ChessGameCanvas(this);  // 创建棋盘层、棋子层和反馈层画布
		} else {
			throw new Error('人生充满意外，需要放平心态');
		}
	}
	
	// 初始化游戏
	this.init;
	
	// 开始游戏
	this.start;
	
	// 暂停游戏
	this.pause;
	
	// 结束游戏
	this.stop;
	
	// 将逻辑坐标转换为像素坐标
	// 参数 {x, y}
	// 返回 {x, y}
	this.logicCoordinate2PixelCoordinate = function () {
		
	}
	
	// 将像素坐标转换为逻辑坐标
	// 参数 {x, y}
	// 返回 {x, y}
	this.PixelCoordinate2LogicCoordinate = function () {
		
	}
}
