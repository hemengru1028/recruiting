import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Contents from './Contents'
import Head from './Head'
import '../CSS/First.css'
// 用户主页面
export default class UserFirst extends Component {
    render() {
        return (
            <div>
                <Head />
                <Contents />
            </div>
        )
    }
}
