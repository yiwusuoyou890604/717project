const jwt = require('jsonwebtoken')
const fs = require('fs')
const http = require('http')
const querystring = require('querystring')
const Mock = require('mockjs')
const _=require('lodash')


function queryapi(url, methods, params) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'www.lb717.com',
            port: 80,
            path: url,
            method: methods,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        let data = ''
        let request = http.request(options, (response) => {

            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(JSON.stringify(data))
            });
        })
        if (methods.toLowerCase() == 'post') {
            request.write(querystring.stringify(params))
        }
        request.end()
    })

}
module.exports = function (app) {

    //商品列表接口
    const options = {
        hostname: 'www.lb717.com',
        port: 80,
        path: '/mall/index/getGoodsChannel',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    };
    app.post('/mall/index/getGoodsChannel', function (req, res) {
        queryapi('/mall/index/getGoodsChannel', 'post', req.body)
            .then((data) => {
                res.end(data)
            })

    })

    //注册接口
    app.post('/user/register', function (req, res) {
        console.log(req.body)
        let user = fs.readFileSync('user.json', { encoding: 'utf-8' })
        user = JSON.parse(user)
    
        user.push(req.body)
        fs.writeFile('user.json', JSON.stringify(user), function () {
            res.end(JSON.stringify({
                "success": 1,
                "info": "注册成功"
            }))
        })
    })

    //登录接口
    app.post('/user/login', function (req, res) {
        let user = fs.readFileSync(__dirname + '/user.json', { encoding: 'utf-8' })
        user = JSON.parse(user)
        let login = req.body;

        let resInfo = {
            success: 0,
            info: '用户名或密码错误',
            token: ''
        }
        user.forEach((item, index) => {
            if (item.username == login.username && item.password == login.password) {
                resInfo.success = 1;
                resInfo.info = 'login success',
                resInfo.user={
                    name:user.username,
                    time:new Date().toLocaleTimeString(),
                    nickName:'jacky'
                }
            }
        })
        if (resInfo.success == 1) {
            resInfo.token = jwt.sign(login, '1511', {
                expiresIn: 60 * 60  //超时时间
            })
        }
        res.end(JSON.stringify(resInfo))
    })

    //添加购物车
    app.post('/user/Cart/addCart', function (req, res) {
        console.log(req.body)
        jwt.verify(req.body.token, '1511', (err, decoded) => {
            
            if (err) {
                res.end(JSON.stringify({
                    info: '登陆失败',
                    detail: err.TokenExpiredError
                }))
            } else {
                let cartInfo = JSON.parse(fs.readFileSync(__dirname + '/cart_info.json', { encoding: 'utf-8' }))
                if (cartInfo[decoded.username]) {
                    let recordList = cartInfo[decoded.username]
                    let flag = false;
                    recordList.forEach((item, index) => {
                        if (item.goods_id == req.body.goods_info.goods_id) {
                            ++item.count
                            flag = true
                        }
                    })
                    if (!flag) {
                        let record = req.body.goods_info
                        record.count = 1
                        record.selected = 0
                        cartInfo[decoded.username].push(record)
                    }
                } else {
                    let record = req.body.goods_info
                    record.count = 1
                    record.selected = 0
                    cartInfo[decoded.username] = [record]
                }
                fs.writeFile(__dirname + '/cart_info.json', JSON.stringify(cartInfo), function () {
                    res.end('1')
                })
            }
        })
    })

    //分类接口
    app.get('/mobile/Category/categorySon', function (req, res) {
        let tbdata = ''
        res.json(1)
    })
    //登录过后获取购物车的商品记录
    app.post('/user/Cart/goodsList', function (req, res) {
        jwt.verify(req.body.token, '1511', (err, decoded) => {
            if (err) {
                res.end(JSON.stringify({
                    info: "登录过期，请重新登录",
                    detail: err.TokenExpiredError,
                    error: 1
                }))
            } else {
                try {
                    let goodsRecord = JSON.parse(fs.readFileSync('./cart_info.json', { encoding: 'utf-8' }))
                    let goodsList=goodsRecord[decoded.username] || []
                    res.json(goodsList)
                }
                catch (error) {
                    res.json(error)
                }
            }
        })
    })

    //删除购物车指定商品
    app.post('/user/Cart/delgoods',function(req,res){
        jwt.verify(req.body.token,'1511',function(err,decoded){
            let cartRecord=JSON.parse(fs.readFileSync('./cart_info.json',{encoding:'utf-8'})) 
            if(err){
                res.json(err)
            }else{
                let cartList=cartRecord[decoded.username]
              console.log(req.body)
                let delGoods=_.remove(cartList,function(item){
                    return req.body.selectedId.indexOf(item.goods_id)>-1
                })
                cartRecord[decoded.username]=cartList
                fs.writeFile(__dirname + '/cart_info.json', JSON.stringify(cartRecord), function () {
                    res.json({
                        info:'删除成功',
                        success:1,
                        delgoods:delGoods,
                        leftGoods:cartList
                    })
                })
                
            }
        })
    })
}