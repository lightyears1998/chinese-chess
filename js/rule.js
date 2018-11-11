// 判断棋子移动是否符合规则
function isConformRule(chess, sx, sy, ex, ey) {
	switch(chess.name){
		case "车": 
			if(rookRule(sx, sy, ex, ey))  return true;
			else return false;
			break;
		case "炮":
			if(cannonRule(sx, sy, ex, ey))  return true;
			else return false;
			break;
		case "马":
			if(knight(sx, sy, ex, ey))  return true;
			else return false;
			break;
		case "象": case "相":
			if(bishopRule(sx, sy, ex, ey))  return true;
			else return false;
			break;
		case "士":
			if(guard(sx, sy, ex, ey)) return true;
			else return false;
			break;
		case "将": case "帅":
			if(kingRule(sx, sy, ex, ey))  return true;
			else return false;
			break;
		case "兵": case "卒":
			if(pawnRule(sx, sy, ex, ey))  return true;
			else return false;
			break;
	}
	return true;
}
// 车的行走规则
function rookRule(sx, sy, ex, ey) {
	if(sx !== ex && sy !== ey)   return false;
	else if (sx === ex){
		for(var i=Math.min(sy, ey)+1; i<Math.max(sy, ey); i++){
			if(mark[sx][i] !== 0) return false;
		}
	}
	else if (sy === ey){
		for(var i=Math.min(sx, ex)+1; i<Math.max(sx, ex); i++){
			if(mark[i][sy] !== 0) return false;
		}
	}
	return true;
}
// 炮的行走规则
function cannonRule(sx, sy, ex, ey) {
	var hasBattery = 0;   // 只能有一个炮台
	if(mark[sx][sy].group !== mark[ex][ey].group && mark[sx][sy] !== 0 &&mark[ex][ey] !== 0) {    // 炮吃棋要隔山打牛
		if(sx !== ex && sy !== ey)   return false;
		else if (sx === ex){
			for(var i=Math.min(sy, ey)+1; i<Math.max(sy, ey); i++){
				if(mark[sx][i] !== 0)   hasBattery++;
			}
			if(hasBattery === 1)  return true;
			else  return false;
		}
		else if (sy === ey){
			for(var i=Math.min(sx, ex)+1; i<Math.max(sx, ex); i++){
					if(mark[i][sy] !== 0)   hasBattery++;
				}
			if(hasBattery === 1)  return true;
			else  return false;
		}
	}
	else {      
		if(rookRule(sx, sy, ex, ey))   return true;     // 移动规则同车
		else   return false;
	}
}
// 马的行走规则
function knight(sx, sy, ex, ey) {
	// 对横竖方向的移动分别判断是否有绊马索
	if(Math.abs(sx - ex) === 2 && Math.abs(sy - ey) === 1) {      // 走竖的日
		if(sx > ex && mark[sx-1][sy] === 0) {             
			return true;
		} 
		else if(sx < ex && mark[sx+1][sy] === 0) {
			return true;
		}
		return false;
	}
	else if(Math.abs(sx - ex) === 1 && Math.abs(sy - ey) === 2) {  // 走横的日
		if(sy > ey && mark[sx][sy-1] === 0) return true;
		else if(sy < ey && mark[sx][sy+1] === 0)  return true;
		return false;
	}	 
}
// 象和相的行走规则
function bishopRule(sx, sy, ex, ey) {
	// 不能过楚河汉界	
	if(mark[sx][sy].group === "red") {
		if(ex > 4)  return false;
	}
	else if(mark[sx][sy].group === "black"){
		console.log(ex);
		if(ex < 5)  return false;
	}
	// 只能走田字形对角线
	if(Math.abs(sx - ex) !== 2 || Math.abs(sy - ey) !== 2 )  return false;
	// 判断是否右绊象脚
	if( sx - ex === 2 && sy - ey === 2) {  // 向左上角
		if(mark[sx-1][sy-1] !== 0)  return false;
	}
	else if( sx - ex === 2 && ey - sy === 2) {  // 向右上角
		if(mark[sx-1][sy+1] !== 0)  return false;
	}
	else if( ex - sx === 2 && ey - sy === 2) {  // 向右下角
		if(mark[sx+1][sy+1] !== 0)  return false;
	}
	else if( ex - sx === 2 && sy - ey === 2) {  // 向左下角
		if(mark[sx+1][sy-1] !== 0)  return false;
	}
	return true;
}
// 士的行走规则
function guard(sx, sy, ex, ey) {
	// 不能离开King
	if(mark[sx][sy].group === "red") {
		if(ey < 3 || ey > 5 || ex > 2)  return false;
	}
	else if(mark[sx][sy].group === "black") {
		if(ey < 3 || ey > 5 || ex < 7)  return false;
	}
	// 只能走一方格的对角线
	if(Math.abs(sx - ex) !== 1 || Math.abs(sy - ey) !== 1 ) return false;
	return true;
}
// 将和帅的行走规则
function kingRule(sx, sy, ex, ey) {
	// 将帅狭路相逢直取中军
	if(sy === ey && ((mark[sx][sy].name === "帅" && mark[ex][ey].name === "将") || (mark[sx][sy].name === "将" && mark[ex][ey].name === "帅")))
	{
		for(var i=Math.min(sx, ex)+1; i<Math.max(sx, ex); i++){
			console.log(mark[i][sy])
			if(mark[i][sy] !== 0)  return false;  
		}
		if(mark[sx][sy].name === "将") alert("黑棋胜");
		else if(mark[sx][sy].name === "帅")  alert("红棋胜");
		return true;
	}
	// 不能离开大本营
	if(mark[sx][sy].group === "red") {
		if(ey < 3 || ey > 5 || ex > 2)  return false;
	}
	else if(mark[sx][sy].group === "black") {
		if(ey < 3 || ey > 5 || ex < 7)  return false;
	}
	// 只能一步步走方格
	if((Math.abs(sx - ex) === 1 && Math.abs(sy - ey) === 0) || (Math.abs(sx - ex) === 0 && Math.abs(sy - ey) === 1))  return true;
}
// 兵和卒的行走规则
function pawnRule(sx, sy, ex, ey) {
	if(mark[sx][sy].group === "red") {
		if(ex < sx)  return false;  // 不能后退
		if(sx < 5 && ey !== sy)   return false;   // 未过楚河汉界前不能左右移动 
	}
	else if(mark[sx][sy].group === "black") {
		if(ex > sx)  return false;
		if(sx > 4 && ey !== sy)   return false;
	}
	// 只能一步步走方格
	if((Math.abs(sx - ex) === 1 && Math.abs(sy - ey) === 0) || (Math.abs(sx - ex) === 0 && Math.abs(sy - ey) === 1))  return true;
}