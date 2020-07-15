module.exports = (app) => {
    const express = require('express')
    const inflection = require( 'inflection' );
    const assert = require('http-assert')
    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken');

    const User = require('./model/User')

    /**创建子路由 */
    const router = express.Router({
        // 将父级url参数resource合并到子路由中，不然字路由中无法获取
        mergeParams: true,
    });

    /**获取资源模型中间件 */
    const resourceMiddle = async(req, res, next) => {
        /** inflection.classify的作用：将categories -> Category */
        const modelName = inflection.classify(req.params.resource);
        req.model = require(`./model/${modelName}`);
        next();
    }

    /**token校验中间件 */
    const tokenMiddle = async(req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop();
        assert(token, 401, '请先登录')

        const { id } = jwt.verify(token, 'alfjaslf');
        assert(id, 401, '请先登录')

        const user = await User.findById(id);
        req.user = user;
        await next()
    }
    
    /**获取列表数据 */
    router.get('/',  async(req, res) => {
        let data = null;
        console.log(req.params.resource)
        if (req.params.resource === 'articles') {
            require('./model/Tag')
            require('./model/Category')
            /** populate 返回对应属性值所关联的整个对象*/
            data = await req.model.find().populate('tags').populate('categories')

        } else {
            data = await req.model.find()
        }
        
        res.send(data);
    })

    /**新增数据 */
    router.post('/create',  async(req, res) => {
        const newData = await req.model.create(req.body);
        res.send(newData);
    })

    /**修改数据 */
    router.put('/:id', async(req, res) => {
        const data = await req.model.findByIdAndUpdate(req.params.id, req.body)
        res.send(data)
    })

    /**查看数据详情 */
    router.get('/:id', async(req, res) => {
        const data = await req.model.findById(req.params.id)
        res.send(data)
    })

    /**删除数据 */
    router.delete('/:id',  async(req, res) => {
        await req.model.findByIdAndDelete(req.params.id);
        res.send({success: true})
    })

    app.use('/api/rest/:resource', resourceMiddle, tokenMiddle, router)

    /**文件上传 */
    const multer = require('multer') // Multer adds a body object and a file or files object to the request object.
    const uploadMiddle = multer({dest: __dirname + '/uploads'})
    app.use('/api/upload', uploadMiddle.single('file'), tokenMiddle, async(req, res) => {
        const file = req.file
        file.url = 'http://localhost:3000/uploads/' + req.file.filename;
        res.send(file)
    })

    /**注册 */
    app.use('/api/register', async(req, res) => {
        const user = await User.create(req.body)
        res.send(user)
    })

    /**获取用户信息 */
    app.use('/api/userInfo', tokenMiddle, async(req, res) => {
        res.send(req.user)
    })

    /**登录 */
    app.use('/api/login', async(req, res) => {
        /**判断用户是否存在 */
        const user = await User.findOne({username: req.body.username}).select('password')
        assert(user, 422, '用户不存在')

        /**校验密码 */
        const isValid = bcrypt.compareSync(req.body.password, user.password)
        assert(isValid, 422, '密码不正确')
        
        /**生成token */
        const token = jwt.sign({id: user._id}, 'alfjaslf')

        res.send({ token })

    })

    /**统一错误处理 */
    app.use(async(err, req, res, next) => {
        res.status(err.status || 500).send({message: err.message})
    })
}


