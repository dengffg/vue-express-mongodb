# vue-express-mongodb
基于element-ui + express + mongoose 所实现的一个简单的后端管理平台，样式完全取自于element-ui组件，主要为了学习练手nodejs。 

### 主要功能：
1. 注册，登录 
    - jwt token生成校验
    - bcrypt 密码加密，解密
    - 守卫路由

2. node端公共的CRUD操作
    - inflection插件使用；

3. node自定义中间件；
    - 校验token;
    - 结合inflection插件将API请求转换成对应model;

4. 图片上传：上传指定目录，返回图片访问地址；
    - multer插件使用

5. mongoose中model间关联

6. 基于mongodb实现数据的增删改查
    - cors插件解决跨域问题

7. node端异常处理；
    - http-assert插件使用



### 本地运行：
1. 安装mongodb, 在server目录下运行 `mongod --dbpath './data'` 启动数据库
2. `npm install` 安装依赖
3. 根目录下运行：`npm run serve` 启动前端服务
4. 全局安装 nodemon 插件， 在server目录下运行`nodemon index.js`运行后端服务
