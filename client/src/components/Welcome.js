import React, { Component } from 'react'

import '../CSS/Welcome.css'


// 用户主页welcome部分
export default class Welcome extends Component {
    render() {
        return (
            <div className='welcome'>
                
                <div className="welcomecontainer">
            
                    <h2>WELCOME TO ZYPC</h2>
                    <h4>代码改变世界， </h4>
                    <h4>编程创造历史。</h4>
                    <div className='learn'><a href="https://zypc.xupt.edu.cn/" >了解我们</a></div>
              </div>
            </div>
        )
    }
}
