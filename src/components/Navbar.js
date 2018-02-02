import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component{
  render(){
    return (
      <div className="ui top menu">
        <Link to="/" className="header item">
          <img src='https://retrocdn.net/images/thumb/c/c5/Logo-vinyl.svg/370px-Logo-vinyl.svg.png' />
        </Link>
        <Link to="/about" className="item">
          About Us
        </Link>
        <Link to="/login" className="item right">
          Log In
        </Link>
      </div>
    )
  }
}

export default Navbar
