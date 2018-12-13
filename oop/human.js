'use strict';

// 使用本地计算机的玩家
function LocalPlayer(game) {
  if (!(this instanceof LocalPlayer)) {
    return new LocalPlayer(game);
  }
  
  this.lastClickedChess = null;  // 鼠标上次点击的棋子
  
  this.mouseInput = function (event) {
    let clickedObj = game.canvas.getChess(event.clientX, event.clientY);
    if (clickedObj instanceof Chess) {
      if (lastClickedChess) {
        
      }
    }
    if (clickedObj instanceof IdlePlace) {
      if (lastClickedChess) {
        
      }
      lastClickedChess = null;
    }
  }
  
  game.canvas.cvsFeedback.addEventListener('click', this.mouseInput.bind(this));
}
