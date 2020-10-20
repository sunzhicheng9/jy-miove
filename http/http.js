const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");
const md5 = require("md5");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");

// 使用中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 使用cors
app.use(cors());


// 对明文密码进行加密的中间件
const passwdCrypt = function (req, res, next) {
    // 获取用户的明文密码
    let password = req.body.password
    req.body.newPassword = md5(password + md5(password).substr(6, 18))

    next()
}

// 引入mongoose
mongoose.connect("mongodb://localhost:27017/maizuo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    headIcon: String,
    gender: Number,
});
const Model = mongoose.model("User", UserSchema, "users");

// 获取.env文件中的secret
const jwt_secret = fs.readFileSync(path.join(__dirname, ".env"), 'utf-8');


// 中间件：验证客户端发送过来的token
const checkToken = async function(req,res,next){
    let tempArr = (req.headers.authorization).split(' ');
    let _token = tempArr[tempArr.length - 1]
    // 验证token 是否合法
    try{
        let verify = jwt.verify(_token,jwt_secret)
        // 二次验证
        let data = await Model.findOne({userId:verify.userId})
        if(data){
            // 合法用户
            req.body.user_id = data.userId
            next();
        }else{
            res.status(403).send({
                code:"9997",
                info:"illegal access",
            });
        }
    }catch(error){
        // 验证失败
        res.status(403).send({
            code:'9998',
            info:'illegal access'

        })
    }
    // next()
}


// 接口：获取登录成功的用户信息
app.get('/api/v1/user_info', checkToken , async (req,res) =>{
    // 获取用户数据
    let {uesrId,gender,mobile,headIcon} = await Model.findOne({userId:req.body.user_id})
    res.send({
        code:'1000',
        info:'success',
        user_info:{
            uesrId,
            gender,
            mobile:mobile.substr(0,7) + '****',
            headIcon
        }
    })
})

// 监听路由
app.get('/', (req, res) => res.send('hello world'));

// 获取初始的密码(用完即删除)
// app.post('/init', passwdCrypt, (req, res) => {
//     res.send('you init password is : ' + req.body.newPassword)
// });

// 用户的登录验证
app.post("/api/v1/login", passwdCrypt, async (req, res) => {
    // 获取用户名（手机号）和密码
    let { mobile, newPassword } = req.body;
    // console.log(req.body);
    // 查询数据表
    let result = await Model.findOne({ mobile, password: newPassword })
    if (result) {
        res.send({
            code: '1000',
            info: 'login success',
            data: {
                _token: jwt.sign({
                    userId: result.userId,
                    mobile: result.mobile.substr(0, 7) + '****'
                }, jwt_secret)
            }
        })
    } else {
        res.send({
            code: '9999',
            info: 'mobile or password is invalid',
            data: {

            }
        })
    }
})

// 监听端口
app.listen('3000', () => {
    console.log('server is runing at http://127.0.0.1:3000');
});