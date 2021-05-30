import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'


// 登录组件
import '../CSS/LoginModules.css'
import ParticlesBg from "particles-bg";

import { throotle } from './throotle'
import session from 'express-session';

export default class LoginModules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            testcode: '',
          
        }
      
        this.emailTest = throotle(this.emailTest)
       
    }
    handleSubmit=(e)=> {

        var props = this.props;

        e.preventDefault()

        // console.log(this.state)
        var formData = this.state



        // function myfunc() {
           
            if (formData ) {
                axios.post('http://localhost:8000/log', {
                   
                    email: formData.email,
                    testcode: formData.testcode,
                  
                })
                    .then((res) => {
                        // console.log(res.data.tk);
                        // console.log(res);

                        if (res.data.err === -4) {
                            alert('验证码错误')
                            return false;
                        }
                        else if (res.data.err === 0) {
                            alert('登录成功')

                            // 登录成功将 token 保存在前端cookie中 
                              let deleteTime = new Date(new Date().getTime() +1000*60*60)
                            cookie.save('useremail', res.data.tk.token, { expires: deleteTime },{path:'/'})

                      

                            // 登录完成跳转到首页 携带参数 email
                            props.history.push({ pathname: "/", state: formData.email})
                      
                        }
                        else if (res.data.err === 3) {
                            // 第二次登录成功
                            alert('登录成功')
                            // 登录成功将 token 保存在前端cookie中 
                              let deleteTime = new Date(new Date().getTime() +10000*60*60)
                            cookie.save('useremail', res.data.tk.token, { expires: deleteTime }, { path: '/' })
                            
                             // 登录完成跳转到首页 携带参数 email
                             props.history.push({ pathname: "/", state: formData.email})
                           
                        }
                        else if (res.data.err === -2) {
                            alert('登录失败')
                            return false
                        }
                    
                        
                    })
            .catch((error) => { console.log(error) })
            }
      
    //    }

    //     myfunc()
      
        
    }

    changeValue(e) {
        let name = e.target.name;
         this.setState({
            [name]:e.target.value
         })
      
    }

  



    

       // 单独校验邮箱
       emailTest() {
        /*校验邮件地址是否合法 */  
        let rg = new RegExp("^[1-9][0-9]{4,10}@qq.com");
      
        let judge = rg.test(this.state.email);
     
        if(judge){
           //  alert("成功");
                let data = {
                'account':this.state.account,
                'mail'  :this.state.email
            };
            axios.post('http://localhost:8000/getMailCode',data)
                .then((res) => {
                    if ( res.data.err === 0 ) {
                        //验证码成功发送且存入数据库 
                            console.log(res);
                        }
                    })
                .catch((err) => {
                        console.log(err);
                    });
        }else{
            alert("请输入正确的QQ邮箱");
        }
    }

    Throotle(e) {
        e.preventDefault()
        this.emailTest()
    }



    render() {
        return (
            
            <div className='Login-Background'>
                 <ParticlesBg color="#ff0000" num={2500} type="lines" bg={true} color='white'/>
            <div className='LoginModules'>
                <h2 className='LoginWelcome'>welcome</h2>

                    <form action="" onSubmit={this.handleSubmit.bind(this)}>
                    <div className='LoginInputs'>
                <div className='register-inp-login'>
                     <input type="email" name="email" id="email" placeholder='邮箱' required="required"  value={this.state.email} onChange={this.changeValue.bind(this)} />
                </div>
                <div className='register-inp-login'>
                                <input type="text" name="testcode" id="test" placeholder='验证码' required="required" value={this.state.testcode} onChange={this.changeValue.bind(this)}/>
                       <button className='testButton'  onClick={this.Throotle.bind(this)}>获取验证码</button>
                 </div>
 
                            {/* <Link to="/login"><input className='login-button' type='submit' value="登录" /></Link> */}
                            <input className='login-button' type='submit' value='登录'  />

                    </div>
              </form>
                 
                </div>
                </div>
        )
    }
}
