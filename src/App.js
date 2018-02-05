import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Login from './components/Login'
import Profile from './components/Profile'
import Reservation from './components/Reservation'
import { Route } from 'react-router-dom'
import api from './services/api'

class App extends Component {
  state = {auth: {currentUser:{}}};

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token){
      api.auth.getCurrentUser().then(user => {
        console.log("response from currentUser endpoint", user);
        const currentUser = {currentUser: user}
        this.setState({auth: currentUser})
      })
    }
  }

  handleLogin = (user) => {
    console.log(user);
    const currentUser = {currentUser: user}
    const userOnline = {token: user.id, type: user.user_type}
    console.log("INNN", userOnline);
    localStorage.setItem('token', JSON.stringify(userOnline))
    this.setState({auth: currentUser})
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({auth: {currentUser:{}}})
  }
  render() {
    console.log("props",this.props);
    console.log("app state", this.state);
    return (
      <div className="App">
        <Navbar currentUser={this.state.auth.currentUser}
          handleLogout={this.handleLogout}
          />
        <div className="ui container">
          <Route exact path="/home" render={routerProps => {return <Homepage history={routerProps.history} />}} />
          <Route exact path="/reservation" component={Reservation} />
          <Route exact path="/" render={routerProps => {return <Login history={routerProps.history} handleLogin = {this.handleLogin} />}} />
          <Route exact path="/profile" render={routerProps =>{ return <Profile history={routerProps.history} currentUser={this.state.auth.currentUser} />}} />
        </div>

      </div>
    );
  }
}

export default App;
