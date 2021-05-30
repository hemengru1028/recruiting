import React, { Component } from 'react'


import Welcome from './Welcome'
import Directions from './Directions'

import Location from './Location'

import '../CSS/Contents.css'
import ParticlesBg from "particles-bg";
// 用户主页内容部分 ：welcome + 方向介绍
export default class Contents extends Component {
    render() {
        return (
            <div className='Contents'>
                 <ParticlesBg type="fountain" bg={true} />
                <Welcome />
                
                <Directions />
                
           
                
                <Location/>
            </div>
        
        )
    }
}
