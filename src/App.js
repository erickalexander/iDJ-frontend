import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Session from './components/Session'
import SessionForm from './components/SessionForm'
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

  handleSubmit = (data) =>{
    console.log("reservations",this.state.auth.currentUser.sessions)
    console.log("session",data);
    function response(session) {
        return session.id === data[0].id;
    }

    this.state.auth.currentUser.sessions.push(data.find(response))
  }

  handleNewSession = (data) => {
    this.state.auth.currentUser.sessions.push(data)
  }

  handleLogin = (data) => {
    console.log('User Logged In', data);
    const user = data.student || data.instructor
    const currentUser = {currentUser: user}
    console.log("CURRENT!!!",currentUser);
    const userOnline = {token: data.token, type: user.user_type}
    console.log("INNN", userOnline);
    localStorage.setItem('token', JSON.stringify(userOnline))
    this.setState({auth: currentUser})
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({auth: {currentUser:{}}})
  }

  handleComplete = (user) => {
    console.log("YPPP",this.state.auth.currentUser);
    this.state.auth.currentUser = user
    console.log("NEWWWWWWAAAA",user);
  }
  render() {
    console.log("props",this.props);
    console.log("app state", this.state);
    return (
      <div className="App">
        <Navbar currentUser={this.state.auth.currentUser}
          handleLogout={this.handleLogout}
          />
        <Route exact path="/" render={routerProps => {return <Homepage history={routerProps.history} />}} />
        <div className="ui container">
          <Route exact path="/reservation" render={routerProps => {return<Session handleSubmit={this.handleSubmit} currentUser={this.state.auth.currentUser}/>}} />
          <Route exact path="/login" render={routerProps => {return <Login history={routerProps.history} handleLogin = {this.handleLogin} />}} />
          <Route exact path="/signup" render={routerProps => {return <Signup history={routerProps.history} handleLogin = {this.handleLogin} />}} />
          <Route exact path="/profile" render={routerProps =>{ return <Profile history={routerProps.history} currentUser={this.state.auth.currentUser} handleComplete={this.handleComplete}/>}} />
          <Route exact path="/newsession" render={routerProps => {return <SessionForm history={routerProps.history} currentUser={this.state.auth.currentUser} handleNewSession={this.handleNewSession} /> }} />
        </div>

      </div>
    );
  }
}

export default App;
