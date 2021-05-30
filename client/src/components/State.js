// 用户报名成功后 进入此页面  此页面显示学生进度

import React, { Component } from 'react'
import '../CSS/state.css'
import axios from 'axios'

import cookie from 'react-cookies'
var jwt = require('jsonwebtoken');


export default class State extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            studentid: '',
            tel: '',
            email: '',
            direction:'',
            status:''
        }
        
    }

 


    componentDidMount() {

       // 获取保存在cookie里的token
       var tk = cookie.load('useremail')
       var email = jwt.decode(tk)
       
            axios.post('http://localhost:8000/state', {
                email: email
               })
             .then((res) => {
                //  console.log(res);
                       if (res.data.err === 0) {
                         //  console.log(res.data.data) 
                      this.setState({username : res.data.data.username})
                           this.setState({ studentid: res.data.data.studentid })
                           this.setState({ tel: res.data.data.tel })
                           this.setState({ email: res.data.data.email })
                           this.setState({ direction: res.data.data.direction})
                           this.setState({status : res.data.data.status}) 
                       }
                   })
             .catch((error) => { console.log(error) })
    

       
  
                
            
    }
    
    handleSubmit() {
        window.location.href = 'http://localhost:3000/'
    }

  
    render() {
        return (
            <div>
                <h3 style={{ display: 'block', textAlign: 'center', margin: '30px' }}>您已报名成功！</h3>
                <div>
                    <h4 id='inputtext'>姓名:<input value={this.state.username}  disabled="disabled" ></input></h4>
                    <h4 id='inputtext'>学号:<input value={this.state.studentid}   disabled="disabled"></input></h4>
                    <h4 id='inputtext'>手机号:<input value={this.state.tel} disabled="disabled"></input></h4>
                    <h4 id='inputtext'>邮箱:<input value={this.state.email} disabled="disabled"></input></h4>
                    <h4 id='inputtext'>方向:<input  value={this.state.direction}  disabled="disabled"></input></h4>
                    <h4 id='inputtext'>当前面试进度:<input  value={this.state.status}  disabled="disabled"></input></h4>
                </div>
                <button id='determine' type='submit' onClick={this.handleSubmit.bind(this)}>确定</button>
             
                
                {/* <h5 style={{ display: 'block', textAlign: 'center', margin: '30px' }}>如需修改方向 请点击返回键重新报名即可</h5>
                <h5 style={{ display: 'block', textAlign: 'center',marginTop:'-25px' }}>确认信息无误 请点击确定键</h5> */}
            </div>
        )
    }
}
