# Web版双人中国象棋  

## 技术栈

Canvas + Jquery + Node + Socket.io

## 游戏规则

博弈双方约定好房间号进入房间，第一个进入房间的人执红旗先行，第二个进入房间执黑棋后手，之后进入房间的是观众，只能观看棋局变化，无法控制棋子和重新开始游戏按钮。

若下棋过程中博弈双方有人掉线，则下一个进入房间的人顶替下线方进行下棋。若博弈双方都掉线了，则下一个进入房间的执红旗，下下个进入的执黑棋。

## 目录结构

```
-index.html：页面入口
-js
  -main.js：游戏初始化
  -checkerboard.js：绘画棋盘的相关函数
  -rule.js：棋子行动规则的相关函数
  -utils.js：一些公用的函数
  -socket.js：前端socket代码
-css
  -style.css：页面样式
-server
  - index.js：后端socket代码
```

## 2019.10 更新日记

- 视觉优化
  - [x] 更新UI。

  - [x] 取消 alert 框，使用自定义的dialog，提高游戏流畅度。

- 游戏
  - [x] 增加聊天室，使双方和观众可以实时通信。

  - [x] 下棋双方上下线通知，当前房间人数统计。 

  - [x] 判断下棋双方的身份，不允许第三方插手 && 不允许控制对方的棋子。

- 代码
  - [x] 取消原先的 php 代码，使用 node 重写。

  - [x] 取消 Ajax 轮询服务器，使用 webSocket 进行通信。

- 功能取消
  - 不再支持单机模式。如果想要一个人下棋，可打开两个页面一个使用红棋一个使用黑棋。

  - 不再保留棋盘信息。原先的 php 代码是将棋盘信息保存在服务器的文件上，现在直接在进入房间的客户端之间传递棋盘信息。

## 服务器运行

```sh
git clone <url>
npm install
npm start;  # npm run start:dev; OR; yarn start:dev
exit;  # Disconnect from server, this also terminates node process.

# If you want to keep your server running after you disconnect,
# use `screen node index.js` or pm2;
npm install --global pm2
pm2 start index.js --name chess-server --watch  # --watch means pm2 will be resetart automatic when you change the code
pm2 stop chess-server
pm2 restart chess-server
pm2 list
pm2 monit
```