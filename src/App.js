import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import About from './components/About'
import Login from './components/Login'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (

      <div className="App">
        <Navbar />
        <div className="ui container">
          <Route exact path="/" component={Homepage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
        </div>

      </div>
    );
  }
}

export default App;
