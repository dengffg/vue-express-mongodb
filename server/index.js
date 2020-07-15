const express = require('express')
const cors = require('cors')

const app = express()

/**解决跨域问题 */
app.use(cors())

/**允许请求提交json格式数据 */
app.use(express.json())

/**配置静态资源路径 */
app.use("/uploads", express.static(__dirname + '/uploads'))

/**引入路由模块 */
require('./router')(app)

/**引入数据库 */
require('./db')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
