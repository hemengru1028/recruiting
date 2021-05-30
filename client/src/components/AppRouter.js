import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import UserFirst from './UserFirst';
import LoginMoudules from './LoginModules'
import RegisterModules from './RegisterModules'
import State from './State'

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            
           
            <Router>
                 
                <Route exact path="/" component={UserFirst}></Route>
                <Route path="/login" component={RegisterModules} ></Route>
                <Route  path="/sign" component={LoginMoudules}></Route>
               
                <Route path='/state' component={State}></Route>
         
           </Router>
        
         );
    }
}
 


export default AppRouter