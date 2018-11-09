// 绘制棋盘
function checkerboard() {	// 画线
	drawCheckerboard();     // 画棋盘
	//drawChess(4, 9);            // 画棋子
	//drawChess(3, 9);
}
// 画线
function cross(sx, sy, ex, ey, bw) {
	context.beginPath();
	context.moveTo(sx+paddingX, sy+paddingY);
	context.lineTo(ex+paddingX, ey+paddingY);
	context.strokeStyle =  "red";
	context.lineWidth = bw;
	context.stroke();
	context.closePath();
}
// 画棋盘
function drawCheckerboard() {
	// 外框
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(canvasWidth,0);
	context.lineTo(canvasWidth, canvasHeight);
	context.lineTo(0, canvasHeight);	
	context.lineTo(0,0);
	context.lineWidth = 6;
	context.strokeStyle = "red";
	context.stroke();
	context.closePath(); 
	for(var i=0; i<=9; i++) {        // 横线
		cross(0, i*ceilHeight, ceilWidth*8, i*ceilHeight, 3);
	}
	for(var i=0; i<=8; i++) {     // 竖线
		if(i==0 || i==8){
			cross(i*ceilWidth, 0, i*ceilWidth, ceilHeight*9, 3);
		}
		else {
			cross(i*ceilWidth, 0, i*ceilWidth, 4*ceilHeight, 3);
			cross(i*ceilWidth, 5*ceilHeight, i*ceilWidth, ceilHeight*9, 3);
		}
		cross(i*ceilWidth, 0, i*ceilWidth, 4*ceilHeight, 3);
	}		
	cross(3*ceilWidth, 0, 5*ceilWidth, 2*ceilHeight, 3);      // 上棋盘斜线
	cross(5*ceilWidth, 0, 3*ceilWidth, 2*ceilHeight, 3);
	cross(3*ceilWidth, 7*ceilHeight, 5*ceilWidth, 9*ceilHeight, 3);   // 下棋盘斜线
	cross(3*ceilWidth, 9*ceilHeight, 5*ceilWidth, 7*ceilHeight, 3);
	var lineW = ceilWidth / 7;   // 折线的宽度
	var lineH = ceilHeight / 7;  // 折线的高度
	var disX = ceilWidth / 14;   // 折线距离边框的横向距离
	var disY = ceilHeight / 14;  // 折线距离边框的纵向距离
	// 上期盘炮折线
	for(var i=1; i<=7; i+=6){
		cross(ceilWidth*i-disX-lineW, ceilHeight*2-disY, ceilWidth*i-disX, ceilHeight*2-disY, 1);    // 上棋盘左炮折线，按左上右上右下左下的顺序
		cross(ceilWidth*i-disX, ceilHeight*2-disY, ceilWidth*i-disX, ceilHeight*2-disY-lineH, 1);
		cross(ceilWidth*i+disX, ceilHeight*2-disY, ceilWidth*i+disX+lineW, ceilHeight*2-disY, 1);
		cross(ceilWidth*i+disX, ceilHeight*2-disY, ceilWidth*i+disX, ceilHeight*2-disY-lineH, 1);
		cross(ceilWidth*i+disX, ceilHeight*2+disY, ceilWidth*i+disX+lineW, ceilHeight*2+disY, 1);
		cross(ceilWidth*i+disX, ceilHeight*2+disY, ceilWidth*i+disX, ceilHeight*2+disY+lineH, 1);
		cross(ceilWidth*i-disX-lineW, ceilHeight*2+disY, ceilWidth*i-disX, ceilHeight*2+disY, 1);    
		cross(ceilWidth*i-disX, ceilHeight*2+disY, ceilWidth*i-disX, ceilHeight*2+disY+lineH, 1);
	}
	// 上棋盘兵折线
	for(var i=0; i<=8; i+=2){
		if(i !== 0){
			cross(ceilWidth*i-disX-lineW, ceilHeight*3-disY, ceilWidth*i-disX, ceilHeight*3-disY, 1);   
			cross(ceilWidth*i-disX, ceilHeight*3-disY, ceilWidth*i-disX, ceilHeight*3-disY-lineH, 1);
			cross(ceilWidth*i-disX-lineW, ceilHeight*3+disY, ceilWidth*i-disX, ceilHeight*3+disY, 1);    
			cross(ceilWidth*i-disX, ceilHeight*3+disY, ceilWidth*i-disX, ceilHeight*3+disY+lineH, 1);
		}
		if(i !== 8){
			cross(ceilWidth*i+disX, ceilHeight*3-disY, ceilWidth*i+disX+lineW, ceilHeight*3-disY, 1);
			cross(ceilWidth*i+disX, ceilHeight*3-disY, ceilWidth*i+disX, ceilHeight*3-disY-lineH, 1);
			cross(ceilWidth*i+disX, ceilHeight*3+disY, ceilWidth*i+disX+lineW, ceilHeight*3+disY, 1);
			cross(ceilWidth*i+disX, ceilHeight*3+disY, ceilWidth*i+disX, ceilHeight*3+disY+lineH, 1);
		}
	}
	// 下棋盘炮折线
	for(var i=1; i<=7; i+=6){
		cross(ceilWidth*i-disX-lineW, ceilHeight*7-disY, ceilWidth*i-disX, ceilHeight*7-disY, 1);    // 上棋盘左炮折线，按左上右上右下左下的顺序
		cross(ceilWidth*i-disX, ceilHeight*7-disY, ceilWidth*i-disX, ceilHeight*7-disY-lineH, 1);
		cross(ceilWidth*i+disX, ceilHeight*7-disY, ceilWidth*i+disX+lineW, ceilHeight*7-disY, 1);
		cross(ceilWidth*i+disX, ceilHeight*7-disY, ceilWidth*i+disX, ceilHeight*7-disY-lineH, 1);
		cross(ceilWidth*i+disX, ceilHeight*7+disY, ceilWidth*i+disX+lineW, ceilHeight*7+disY, 1);
		cross(ceilWidth*i+disX, ceilHeight*7+disY, ceilWidth*i+disX, ceilHeight*7+disY+lineH, 1);
		cross(ceilWidth*i-disX-lineW, ceilHeight*7+disY, ceilWidth*i-disX, ceilHeight*7+disY, 1);    
		cross(ceilWidth*i-disX, ceilHeight*7+disY, ceilWidth*i-disX, ceilHeight*7+disY+lineH, 1);
	}
	// 下棋盘兵折线
	for(var i=0; i<=8; i+=2){
		if(i !== 0){
			cross(ceilWidth*i-disX-lineW, ceilHeight*6-disY, ceilWidth*i-disX, ceilHeight*6-disY, 1);   
			cross(ceilWidth*i-disX, ceilHeight*6-disY, ceilWidth*i-disX, ceilHeight*6-disY-lineH, 1);
			cross(ceilWidth*i-disX-lineW, ceilHeight*6+disY, ceilWidth*i-disX, ceilHeight*6+disY, 1);    
			cross(ceilWidth*i-disX, ceilHeight*6+disY, ceilWidth*i-disX, ceilHeight*6+disY+lineH, 1);
		}
		if(i !== 8){
			cross(ceilWidth*i+disX, ceilHeight*6-disY, ceilWidth*i+disX+lineW, ceilHeight*6-disY, 1);
			cross(ceilWidth*i+disX, ceilHeight*6-disY, ceilWidth*i+disX, ceilHeight*6-disY-lineH, 1);
			cross(ceilWidth*i+disX, ceilHeight*6+disY, ceilWidth*i+disX+lineW, ceilHeight*6+disY, 1);
			cross(ceilWidth*i+disX, ceilHeight*6+disY, ceilWidth*i+disX, ceilHeight*6+disY+lineH, 1);
		}
	}
	// 楚河汉界
	var fontSize = ceilHeight / 1.5;
	context.font = String(fontSize) + 'px' + " KaiTi";
	context.fillStyle = "red";
	context.fillText("楚河", ceilWidth*0.8, ceilHeight*5+paddingY/2);
	context.fillText("汉界", ceilWidth*6.8, ceilHeight*5+paddingY/2);
}
// 画棋子
function drawChess(obj) {
	if(obj !== 0){
			context.beginPath();
			context.strokeStyle = "rgb(221, 200, 113)";
			context.fillStyle = "rgb(221, 200, 113)";
			context.arc(obj.y*ceilWidth+paddingX, obj.x*ceilHeight+paddingY, chessSize, 0, 2*Math.PI);
			context.fill();
			if(obj.group === "red") {
				context.fillStyle = "red";
			}
			if(obj.group === "black") {
				context.fillStyle = "black";
			}
			context.font = String(chessFontSize) + 'px' + "KaiTi";
			context.fillText(obj.name, obj.y*ceilWidth+paddingX/2.8, obj.x*ceilHeight+paddingY*1.5);
			context.stroke();
			context.closePath();
	}

}