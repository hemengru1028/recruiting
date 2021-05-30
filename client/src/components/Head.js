import React, { Component } from 'react'

import LoginButton from '../components/LoignButton'
import '../CSS/Head.css'


// import Contents from './/Contents'
import '../CSS/Contents.css'

// 用户主页：头部
export default class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            

        }  
    }

   


    render() {
        return (
            <div>
                {/* 头部 */}
                <div className='Head'>
                <h2> Z Y P C</h2>
                    <LoginButton className='LoginButton'/>
                
                </div>

              
                
            </div>
            
        )
    }
}
