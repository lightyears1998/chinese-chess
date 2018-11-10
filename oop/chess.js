'use strict';


// 象棋游戏对象
function ChessGame(node) {
    if (!(this instanceof ChessGame)) {
    	return new ChessGame(node);
    }
    if (!node) {
    	throw new Error('人生充满意外，需要放平心态');
    }
    
	this.node;   // 游戏在DOM树中的节点
	this.canvas; // 游戏画布

	this.init;   // 初始化游戏
	this.start;  // 开始游戏
	this.pause;  // 暂停游戏
	this.stop;   // 结束游戏

    this.node = node;
    this.canvas = new ChessGameCanvas(this);
}


// 绑定游戏对象的画布
function ChessGameCanvas(game) {
	if (!(this instanceof ChessGameCanvas)) {
		return new ChessGameCanvas(game);
	}
	if (!(game instanceof ChessGame)) {
        throw new Error('人生充满意外，需要放平心态');
	}
    
    this.cvsChessboard;   // 棋盘画布
	this.cvsChesses;      // 棋子画布
	this.cvsFeedback;     // 反馈画布

    this.updateMeasuring; // 更新度量
    this.canvasLength;    // 画布尺寸
    this.offsetTop;       // 绘图坐标原点距离父元素顶端的偏移
    this.offsetLeft;      // 绘图坐标原点距离父元素左端的偏移
    this.cellLength;      // 单位棋盘格子的长度

    this.draw;            // 绘制游戏
    this.drawChessboard;  // 绘制棋盘
    this.drawChesses;     // 绘制棋盘上的棋子

    // 棋子逻辑坐标与绘图坐标的相互转换
	this.logicCoordinate2DrawingCoordinate;
	this.DrawingCoordinate2LogicCoordinate;
    
    this.updateMeasuring = function () {
        let parentHeight = game.node.clientHeight;
        let parentWidth = game.node.clientWidth;
        this.canvasLength = Math.min(parentHeight, parentWidth);
        this.cellLengh = this.canvasLength / 11;
        this.offsetTop = (parentHeight - this.canvasLength) / 2;
        this.offsetLeft = (parentWidth - this.canvasLength) / 2;
        [this.cvsChessboard, this.cvsChesses, this.cvsFeedback].forEach(function (cvs) {
            cvs.style.top = `${this.offsetTop}px`;
            cvs.style.left = `${this.offsetLeft}px`;
            cvs.width = `${this.canvasLength}`;
            cvs.height = `${this.canvasLength}`;
        }.bind(this));
    }
    
    this.draw = function () {
        this.updateMeasuring();
        this.drawChessboard();
        this.drawChesses();
    }
    
    this.drawChessboard = function () {
        let ctx = this.cvsChessboard.getContext('2d');
        ctx.strokeRect(0, 0, this.canvasLength, this.canvasLength);
    }
    
    this.drawChesses = function () {
        
    }
    
    {['cvs-chessboard', 'cvs-chesses', 'cvs-feedback'].forEach(function (cvs_name) {
    	let cvs = document.createElement('canvas');
    	cvs.setAttribute('id', `${game.node.id}-${cvs_name}`);
    	cvs.setAttribute('style', 'position: absolute;');
    	game.node.appendChild(cvs);
    });}
    this.cvsChessboard = document.getElementById(`${game.node.id}-cvs-chessboard`); 
    this.cvsChesses = document.getElementById(`${game.node.id}-cvs-chesses`); 
    this.cvsFeedback = document.getElementById(`${game.node.id}-cvs-feedback`);
   
    window.addEventListener('resize', this.draw.bind(this));
    
    this.draw();
}
