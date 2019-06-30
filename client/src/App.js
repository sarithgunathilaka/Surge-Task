import React, { Component } from 'react';
import 'whatwg-fetch';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layouts/Navbar'
import Login from './components/Pages/Login'
import Dashboard from './components/Pages/Dashboard'
import Register from './components/Pages/Register'



class App extends Component {
  
  render() {
    return (
        <Router>
        <div>
          <div>
          <Navbar />
            <Route path="/" exact={true} component={Login}/>
            <Route path="/dashboard" exact={true} component={Dashboard}/>
            <Route path="/register" exact={true} component={Register}/>
          </div>
          <br />
          <br />
         </div>
        </Router>
      );
  }
}

export default App;