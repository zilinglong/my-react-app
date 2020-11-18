import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import Login from './views/Login';
import Register from './views/Register';
import './App.css';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <p>首页</p>
          <ul>
            <li>
              <NavLink to="/">回到首页</NavLink>
              <NavLink to="/login">登录</NavLink>
              <NavLink to="/register">注册</NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;

