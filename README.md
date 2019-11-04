# Chinese chess on the web  

## Technology stack
Jquery + Node + Socket.io

## Introduction
If both parties enter the same room number, it is a double mode. Otherwise, it is in single mode.

This version of Chinese chess does not verify the two players, which means either side can control red and black chess. So consciously abide by the rules of playing chess.   

## The rules of the game
First click on the chess pieces you want to move (the red flag should be carried first), and then click on the position you want to move. If you follow the rules of Chinese chess, you can move successfully. The red and black sides alternate until the end of the game.

## Expected improvement
Rebuild the project with Vue and support for mobile gaming.


## 2019.10 更新日记

- 视觉优化
  - [x] 更新UI。

  - [x] 取消 alert 框，使用自定义的dialog，提高游戏流畅度。

- 游戏
  - [x] 增加聊天室，使双方和观众可以实时通信。

  - [x] 下棋双方上下线通知，当前房间人数统计。 

  - [x] 判断下棋双方的身份，不允许第三方插手 && 不允许控制对方的棋子。

> 不再支持单机模式。如果想要一个人下棋，可打开两个页面一个使用红棋一个使用黑棋。

- 代码
  - [x] 取消原先的 php 代码，使用 node 重写。

  - [x] 取消 Ajax 轮询服务器，使用 webSocket 进行通信。

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


---

**Welcome to provide your issues, pull requests and ideas!**

