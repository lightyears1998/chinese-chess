// 中国象棋的记谱方法？ - kevin bear的回答 - 知乎
// https://www.zhihu.com/question/24517862/answer/28064955

// 棋盘大小 十行九纵
//
// 内部坐标 0...8
// 0
// ...
// 9
//
// 红
// 一 二 三 四 五 六 七 八 九
//
// 黑
// ９ ８ ７ ６ ５ ４ ３ ２ １

const redNumber = [0, '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const blackNumber = [0, '１', '２', '３', '４', '５', '６', '７', '８', '９'];

function getNotion(chess, fromChessX, fromChessY, toChessX, toChessY) {
    let move = '';
    const {name, group} = chess;

    move += name;

    if (group === 'red') {
        let fromCol = redNumber[1 + fromChessY ];
        let toCol = redNumber[1 + toChessY];

        if (fromChessX === toChessX) { // 红平
            move += `${fromCol}平${toCol}`;
        } else if (fromChessX > toChessX) { // 红退
            if (fromCol === toCol) {
                let step = redNumber[fromChessX - toChessX];
                move += `${fromCol}退${step}`;
            } else {
                move += `${fromCol}退${toCol}`;
            }
        } else if (fromChessX < toChessX) { // 红进
            if (fromCol === toCol) {
                let step = redNumber[toChessX - fromChessX];
                move += `${fromCol}进${step}`;
            } else {
                move += `${fromCol}进${toCol}`;
            }
        }
    } else { // group === 'black'
        let fromCol = blackNumber[9 - fromChessY];
        let toCol = blackNumber[9 - toChessY];

        if (fromChessX === toChessX) { // 黑平
            move += `${fromCol}平${toCol}`;
        } else if (fromChessX > toChessX) { // 黑进
            if (fromCol === toCol) {
                let step = blackNumber[fromChessX - toChessX];
                move += `${fromCol}进${step}`;
            } else {
                move += `${fromCol}进${toCol}`
            }

        } else if (fromChessX < toChessX) { // 黑退
            if (fromCol === toCol) {
                let step = blackNumber[toChessX - fromChessX];
                move += `${col}退${step}`;
            } else {
                move += `${fromCol}退${toCol}`;
            }
        }
    }

    return move
}
