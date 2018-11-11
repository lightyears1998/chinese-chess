'use strict';


// 象棋游戏对象
function ChessGame(node) {
  if (!(this instanceof ChessGame)) {
    return new ChessGame(node);
  }
  if (!node) {
    throw new Error('人生充满意外，需要放平心态');
  }

	this.node;     // 游戏在DOM树中的节点
	this.chesses;  // 游戏中的棋子 
	this.canvas;   // 游戏画布

	this.init;     // 初始化游戏
	
	this.start;    // 开始游戏
	this.pause;    // 暂停游戏
	this.stop;     // 结束游戏
	
	thus.move;     // 移动棋子
	this.history;  // 行棋历史记录

	this.init = function () {
		
	}

  this.node = node;
  this.canvas = new ChessGameCanvas(this);
}


// 棋子对象
function Chess(name, rank) {
	if (!(this instanceof Chess)) {
		return new Chess(name, rank);
	}
	
	this.name = name;  // 棋名
	this.rank = rank;  // 军衔
	this.camp = camp;  // 阵营
	
	this.listPossibleMove() {

	}
}


// 棋子移动对象
function ChessMove() {
	this.type;  // 移动类型：trivial（平凡）, attck（攻击）
}


// 游戏对象绑定的画布
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
  this.canvasWidth;     // 画布宽度
  this.canvasHeight;    // 画布高度
  this.offsetTop;       // 绘图坐标原点距离父元素顶端的偏移
  this.offsetLeft;      // 绘图坐标原点距离父元素左端的偏移
  this.cellLength;      // 单位棋盘格子的长度

  this.draw;            // 绘制游戏
  this.drawChessboard;  // 绘制棋盘
  this.drawChesses;     // 绘制棋盘上的棋子

  // 像素坐标、逻辑坐标与象棋坐标
  // 棋子逻辑坐标与像素坐标的相互转换
	this.logicCoordinate2PixelCoordinate;
	this.PixelCoordinate2LogicCoordinate;

  // 计算画布宽高等棋盘参数
  this.updateMeasuring = function () {
    let parentHeight = game.node.clientHeight;
    let parentWidth = game.node.clientWidth;
    // 将画布所占空间视为正方形，正方形边长取父元素宽高中的较小值
    this.canvasHeight = Math.min(parentHeight, parentWidth);
    // 计算画布（9单元格 x 10单元格）的实际大小
    this.cellLength = Math.floor(this.canvasHeight / 10);
    this.canvasWidth = this.cellLength * 9;
    this.canvasHeight = this.cellLength * 10;
    // 计算画布距离父元素的偏移量
    this.offsetTop = (parentHeight - this.canvasHeight) / 2;
    this.offsetLeft = (parentWidth - this.canvasHeight) / 2 + this.cellLength / 2;
    // 设置画布的DOM属性
    [this.cvsChessboard, this.cvsChesses, this.cvsFeedback].forEach(function (cvs) {
      cvs.style.top = `${this.offsetTop}px`;
      cvs.style.left = `${this.offsetLeft}px`;
      cvs.width = `${this.canvasWidth}`;
      cvs.height = `${this.canvasHeight}`;
    }.bind(this));
  }

  this.draw = function () {
    this.updateMeasuring();
    this.drawChessboard();
    this.drawChesses();
  }
  
  // 中国象棋棋盘
  // 宽9单元格，其中内外边框距共计1格、阵营宽度8格
  // 高10单元格，其中内外边框距1格、各阵营高度4格、楚河汉界1格
  this.drawChessboard = function () {
    let ctx = this.cvsChessboard.getContext('2d');
    
    // 绘制棋盘外围的边框
    ctx.strokeRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // 绘制棋盘上的竖直线
    for (let i = 0; i < 9; i++) {
      let x = (0.5 + i) * this.cellLength;
      let y = [0.5, 4.5, 5.5, 9.5].map((item) => item * this.cellLength);
      for (let j = 0; j < 4; j += 2) {
        ctx.beginPath();
        ctx.moveTo(x, y[j]);
        ctx.lineTo(x, y[j+1]);
        ctx.stroke();
      }
    }
    
    // 绘制棋盘上的水平线
    for (let i = 0; i < 10; i++) {
      let x = [0.5, 8.5].map((item) => item * this.cellLength);
      let y = (0.5 + i) * this.cellLength;
      ctx.beginPath();
      ctx.moveTo(x[0], y);
      ctx.lineTo(x[1], y);
      ctx.stroke();
    }
    
    // 绘制楚河汉界
    {
      let x = [0.5, 8.5].map((item) => item * this.cellLength);
      let y = [4.5, 5.5].map((item) => item * this.cellLength);
      for (let i = 0; i < 2; i++) {
          ctx.beginPath();
          ctx.moveTo(x[i], y[0]);
          ctx.lineTo(x[i], y[1]);
          ctx.stroke();
      }
    }    
    
    // 绘制棋盘上大本营处的斜线
    {
      let head = [
        [3.5, 0.5], [5.5, 0.5], [3.5, 7.5], [5.5, 7.5]
      ].map((pair) => pair.map((val) => val * this.cellLength));  // 折线起点的像素坐标
      let tail = [
        [5.5, 2.5], [3.5, 2.5], [5.5, 9.5], [3.5, 9.5]
      ].map((pair) => pair.map((val) => val * this.cellLength));  // 折线终点的像素坐标
      for (let i = 0; i < 4; ++i) {
        ctx.beginPath();
        ctx.moveTo(head[i][0], head[i][1]);
        ctx.lineTo(tail[i][0], tail[i][1]);
        ctx.stroke();
      }
    }
    
    // 绘制棋盘上特殊位置的标记
    {
      let place = [
        [1.5, 2.5], [7.5, 2.5], [0.5, 3.5], [2.5, 3.5], [4.5, 3.5], [6.5, 3.5], [8.5, 3.5],
        [1.5, 7.5], [7.5, 7.5], [0.5, 6.5], [2.5, 6.5], [4.5, 6.5], [6.5, 6.5], [8.5, 6.5],
      ];  // 特殊位置的逻辑坐标
      for (let i = 0; i < place.length; ++i) {
        for (let dx = -1/16; dx <= 1/16; dx += 1/8) {
          for (let dy = -1/16; dy <= 1/16; dy += 1/8) {
            let center = [place[i][0] + dx, place[i][1] + dy];
            if (center[0] > 0.5 && center[0] < 8.5) {
              let pt = [
                [center[0] + 4 * dx, center[1]],
                [center[0], center[1]],
                [center[0], center[1] + 4 * dy]
              ].map((pair) => pair.map((val) => val * this.cellLength));
              ctx.beginPath();
              ctx.moveTo(pt[0][0], pt[0][1]);
              ctx.lineTo(pt[1][0], pt[1][1]);
              ctx.lineTo(pt[2][0], pt[2][1]);
              ctx.stroke();
            }
          }
        }
      }
    }
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
