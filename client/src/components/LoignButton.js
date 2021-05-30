import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import '../CSS/LoginButton.css'
import cookie from 'react-cookies'
import user from '../imgs/用户.png'
// import User from '../../db/model/userModel';
import '../CSS/LoginButton.css'
import axios from 'axios';
var jwt = require('jsonwebtoken');

// 用户主页登录按钮
export default class LoignButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            x:'none'
        }
        
    }


    componentDidMount() {
   
  


    }

    // 点击user 出现user头像
    handleClick(e) {
        this.setState({
            x: 'block',
            // y: 'none'
       })
    }
    
    // 点击个人信息 
    // 1.当未报名时跳转到报名页面 已报名时跳转到个人信息展示页面
    // 2.cookie过期时重新登录
    handleDirect(e) {
        e.preventDefault()
      
 
           var tk = cookie.load('useremail')
           // console.log(tk);
           var email = jwt.decode(tk)
        // console.log(tk);
        if (tk !== undefined) {
            // 登录未过期时 执行 1操作
            // console.log('未过期');
            var userinformation = cookie.load('userinformation')
            // console.log(userinformation);

            // 用户点击 个人信息  
            // 如果cookie中已经存在 用户报名的信息 渲染state组件  并且删除cookie中的userinformation
            // 如果不存在 跳转到 报名组件

            if (userinformation !== undefined) {
                window.location.href = 'http://localhost:3000/state'
                
                // cookie.remove('userinformation', { path: '/' })
            }
            else {
                // window.location.href = 'http://localhost:3000/login'
                axios.post('http://192.168.3.21:8000/check',{email:email},{headers:{
                    "Content-Type": "application/json;charset=utf-8",
                    'set-cookie': tk
                }}).then((res)=> {
                    if (res.data.err === -2) {
                        // 登录已过期
                        alert('登录已过期！请重新登录！')
                        window.location.href = 'http://localhost:3000/'
                    }
                    else if (res.data.err === 0) {
                        // 第一次登录 还没报名
                        // 跳转到报名页面
                        window.location.href='http://localhost:3000/login'
                    }
                    else if (res.data.err === 2) {
                        // 第一次登陆之后 再进行的登录
                        // 已报过名 渲染state组件
                        // console.log('okok');
                        window.location.href = 'http://localhost:3000/state'

                    }
                })
                    .catch((err) => {
                        console.log(err)
                })



            }
    
        }

        else {
            // 登录已过期 重新登录
            alert('登录已过期！请重新登录！')
       
                window.location.href='http://localhost:3000/sign'

        }
    }
    render() {

        var tk = cookie.load('useremail')
        // var tkstr = tk.toString()
        // console.log(tkstr);

    //    console.log(tk);
        if (tk) {
            return (
            <div>  
               
                    <div className="Usercenter">
                        <img src={user} alt="" onClick={this.handleClick.bind(this)} />
                       
                    </div>

                    <div className='Spinner' style={{  display:this.state.x}}>
                          <ul>
                             <li><span onClick={this.handleDirect.bind(this)} >个人信息</span></li>
                         </ul>
                    </div>
             
            </div>
             )
        }
        else {
            return (
                <div className='Login'><Link to='/sign'>登录</Link></div> 
             )
        }
    }
}


