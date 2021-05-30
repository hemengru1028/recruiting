import React, { Component } from 'react'

import {Link} from 'react-router-dom'

import web from '../imgs/前端.jpg'
import back from '../imgs/后端.jpg'
import security from '../imgs/安全.jfif'
import product from '../imgs/产品.jfif'

import '../CSS/Add.css'
import '../CSS/Directions.css'
import cookie from 'react-cookies'
var jwt = require('jsonwebtoken');


// 用户主页： 关于方向部分
export default class Directions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ""
       
        }
        

    }
    componentDidMount() {
     
    }

    handleClick(e) {
        e.preventDefault()
        var tk = cookie.load('useremail')
        if (tk) {  //登录状态
            window.location.href='http://localhost:3000/login'
        }
        else {
            //登录已过期
            window.location.href='http://localhost:3000/sign'
        }
    }

    render() {
        return (
            <div className='directions'>
                {/* <h4 className='About'>ABOUT US</h4> */}
                <div className='AddBox'>
                    {/* <div href="" className='Add'><Link to='/login'>加入我们</Link></div> */}
                    <div href="" className='Add' onClick={this.handleClick.bind(this)}>报名入口</div>
            </div>
                <div className='directionscontainer'>
                    <div className='web row'>
                        <img src={web} alt="" />
                        {/* <h5>前端组
                        </h5> */}
                        <h4>前端组</h4>
                        <p className='data'>
                        web前端通常是指网站的前台部分,包括网页的表现层和结构层;web页面的结构、web的外观视觉表现以及web页面的交互。
                        </p>
                   </div>
                    <div className='back row'>
                        <img src={back} alt="" />
                        <h4>后端组
                        </h4>
                        <p className='data'>
                        后端开发即:服务器端开发。就是用代码实现业务逻辑，控制着前端的内容，主要负责程序设计架构思想，管理数据库等。
                        </p>
                   </div>
                    <div className='security row'>
                        <img src={security} alt="" />
                        <h4>安全运维组
                        </h4>
                        <p className="data">
                        主要是终端的运行维护，包括客户端故障排除、硬件故障修复、应用系统软件客户端安装、终端安全防护等方面的内容。
                        </p>
                   </div>
                    <div className='product row' >
                        <img src={product} alt="" />
                        <h4>产品运营组
                        </h4>
                        <p className="data">
                        产品运营就是建立产品和用户之间的价值。链接用户涉及到产品的内容、渠道、拉新等；一切围绕着网站产品进行的人工干预都叫运营。
                        </p>
                   </div>
                    
              </div>
            </div>
        )
    }
}
