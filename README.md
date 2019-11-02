# 餐廳評論網


「餐廳評論網」的目標是幫助網站使用者完成以下事情：

* 找到好餐廳
* 查看餐廳的基本資訊

因此，除了網站本身會提供豐富的餐廳資訊，我們也會建立使用者評論與收藏等互動功能，累積使用者的活動數據，讓值得推薦的好餐廳浮上檯面。

## 環境建置與需求
---
### 基本工具
* MySQL
* Node.js

### 其他套件們
* bcrypt-nodejs: 0.0.3
* body-parser: ^1.19.0
* connect-flash: ^0.1.1
* dotenv: ^8.2.0
* express: ^4.17.1
* express-handlebars: ^3.1.0
* express-session: ^1.17.0
* faker: ^4.1.0
* imgur-node-api: ^0.1.0
* method-override: ^3.0.0
* multer: ^1.4.2
* mysql2: ^2.0.0
* passport: ^0.4.0
* passport-local: ^1.0.0
* pg: ^7.12.1
* sequelize: ^5.21.1
* sequelize-cli: ^5.5.1 

## 安裝與執行步驟
---
### 1.安裝檔案
```
git clone https://github.com/wendyhsiao/restaurant_forum_A3_V1.git
```

### 2.切換至 restaurant_forum_A3_V1 根目錄
```
cd restaurant_forum_A3_V1
```

### 3.安裝套件
在根目錄下執行
```
npm install
```

### 4.設定檔案
在根目錄下新增`.env`檔案，並加入以下內容：

```
IMGUR_CLIENT_ID=***your_client_id***
```

### 5.啟動伺服器
```
npm run dev
```
### 6.在瀏覽器輸入網址 `localhost:3000`即可看到內容

### 7.測試帳號
* 第一組帳號有 admin 權限：   
  * email: root@example.com   
  * password: 12345678
* 第二組帳號沒有 admin 權限：   
  * email: user1@example.com   
  * password: 12345678
