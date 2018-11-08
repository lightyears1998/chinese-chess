// 绘制棋盘
function checkerboard() {	
	// 外框
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(boxWidth,0);
	context.lineTo(boxWidth, boxHeight);
	context.lineTo(0, boxHeight);	
	context.lineTo(0,0);
	context.lineWidth = 6;
	context.strokeStyle= "red";
	context.stroke();
	context.closePath();
	var ceilWidth = Math.ceil(boxWidth / 8);    // 棋盘上每个格子的宽
	var ceilHeight = Math.ceil(boxHeight / 9);  // 棋盘上每个格子的高
	for(var i=1; i<=8; i++) {        // 横线
		cross(0, i*ceilHeight, boxWidth, i*ceilHeight, 3);
	}
	for(var i=1; i<=8; i++) {     // 上棋盘竖线
		cross(i*ceilWidth, 0, i*ceilWidth, 4*ceilHeight, 3);
	}
	for(var i=1; i<=8; i++) {    // 下棋盘竖线
		cross(i*ceilWidth, 5*ceilHeight, i*ceilWidth, boxHeight, 3);
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
	// 下期盘炮折线
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
}
// 画线
function cross(sx, sy, ex, ey, bw) {
	context.beginPath();
	context.moveTo(sx, sy);
	context.lineTo(ex, ey);
	context.strokeStyle =  "red";
	context.lineWidth = bw;
	context.stroke();
	context.closePath();
}

/* function chessPiecesInit() {
	$("#redSoldier1").css({"top":420, "left": 0});
	$("#redSoldier2").css({"top":420, "left": 140});
	$("#redSoldier3").css({"top":420, "left": 280});
	$("#redSoldier4").css({"top":420, "left": 420});
	$("#redSoldier5").css({"top":420, "left": 560});
	$("#redCannon1").css({"top":490, "left":70} ); 
	$("#redCannon2").css({"top":490, "left":490} ); 
	$("#redGeneral").css({"top":630, "left":280} ); 
	console.log(1);
	
} */