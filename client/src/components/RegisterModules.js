import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import {  Modal,Botton } from 'antd';
import  'antd/dist/antd.css'
import '../CSS/RegisterModules.css'




import ParticlesBg from "particles-bg";
var jwt = require('jsonwebtoken');



// 报名填写信息组件
export default class RegisterModules extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            studentid: '',
            tel: '',
            email: '',
            testcode: '',
            direction: '前端',
            status:'等待一面'
        }
      
      
    }

    changeValue=(e)=>{
        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        })

    }

    handleSubmit(e) {
        e.preventDefault();

        // console.log( this.state);
        var formData = this.state;
        // var props = this.props;

        
        /* 姓名：校验是否中文名称组成 */
        function ischina(str) {
            var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; /*定义验证表达式*/
            return reg.test(str); /*进行验证*/
        }

      
        /*学号：校验是否全由8位数字组成 */
        
        function isStudentNo(idStr) {
            var reg = /^[0-9]{8}$/; /*定义验证表达式*/
            return reg.test(idStr); /*进行验证*/
        }
    
        /*校验手机号格式 */
        function isTelCode(str) {
            var reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
            return reg.test(str);
        }
        
        
    
        function myfunc() {
            if (!ischina(formData.username)) {
                alert('请输入中文学生姓名')
                return false
            }
            if (!isStudentNo(formData.studentid)) {
                alert("请输入正确的8位学号");
                return false
            }
            
            if (!isTelCode(formData.tel)) {
                alert('请输入正确的手机号')
                return false
            }
           
            if (ischina(formData.username) && isStudentNo(formData.studentid) && isTelCode(formData.tel)) {
                
                // 获取保存在cookie里的token
                var tk = cookie.load('useremail')
                // console.log(tk);
                var email = jwt.decode(tk)
        

                const confirm = Modal.confirm;
                confirm( {
                         title: "确定提交信息吗？",
                        onOk: () => {
                     
                        axios.post('http://localhost:8000/post', {
                            // email: this.props.location.query.state ,
                            email: email,
                            username: formData.username,
                            studentid: formData.studentid,
                            tel: formData.tel,
                            direction: formData.direction,
                            status: formData.status
                        }, {
                            headers: {
                                "Content-Type": "application/json;charset=utf-8",
                                'set-cookie': tk
                            }
                        })
                            .then((res) => {
                                if (res.data.err === -4) {
                                    alert('验证码错误')
                                    return false;
                                }
                                else if (res.data.err === 0) {
                                    alert('报名成功')
                         
                                    // 报名成功之后 将用户报名提交的表单信息保存到cookie里
                                    cookie.save('userinformation', formData, { path: '/' })
                                    // 获取保存在cookie里的userinformation
                                    //    var userinformation = cookie.load('userinformation')
                                    // console.log(userinformation);

                                    window.location.href = 'http://localhost:3000/'
                            

                                }
                                else if (res.data.err === 5) {
                                    alert('登录已过期！请重新登录！')
                                    window.location.href = 'http://localhost:3000/'
                                }
                                else if (res.data.err === -2) {
                                    alert('报名失败')
                                    return false
                                }
                    
                       
                            })
                            .catch((error) => { console.log(error) })
                    }     
                    ,
                    onCancel: () => {
                         
                    }
                });
            }
 }

            myfunc()
    
        }
    
     

   

 


        render() {
            return (
                <div className="Register-Background">
               

                    <ParticlesBg color="#ff0000" num={2500} type="lines" bg={true} color='white' />
                    <div className='RegisterModules'>
                        <h2 className='Register-Welcome'>welcome</h2>

                        <div className='RegisterInputs'>
                            <form action="" id='login-form'  onSubmit={this.handleSubmit.bind(this)}>
                                <div className='register-inp'>
                                    <input type="text" name="username" id="" placeholder='姓名' required="required" onChange={this.changeValue.bind(this)} value={this.state.username} />
                                </div>
                                <div className='register-inp'>
                                    <input type="text" name="studentid" id="" placeholder='学号' required="required"  value={this.state.studentid} onChange={this.changeValue.bind(this)} />
                                </div>
                              
                                <div className='register-inp'>
                                    <input type="text" name="tel" id="" placeholder='手机号' required="required"  value={this.state.tel} onChange={this.changeValue.bind(this)} />
                                </div>
                               
                                <div className='register-inp choose'>
                                    <span className='choosetext'>方向选择：</span>
                            <select name="direction" id="direction" value={this.state.direction} onChange={this.changeValue.bind(this)}>
                                        <option value="前端" name='web'>前端</option>
                                        <option value="后端" name='back'>后端</option>
                                        <option value="安全运维" name='security'>安全运维</option>
                                        <option value="产品运营" name="product" >产品运营</option>
                                    </select>
                                </div>
                                <input className='login-button' type='submit' value="立即报名" />
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }