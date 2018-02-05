import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component{
  render(){
    const loggedIn = !!this.props.currentUser.id
    const userType = this.props.currentUser.user_type
    return (
      <div className="ui top menu">
        <Link to="/home" className="header item">
          <img src='https://retrocdn.net/images/thumb/c/c5/Logo-vinyl.svg/370px-Logo-vinyl.svg.png' />
        </Link>
        <Link to="/profile" className="item">
          Profile
        </Link>
        {
          loggedIn ? <div className="item">{`Welcome ${this.props.currentUser.username}`}</div> :null
        }
        {
          loggedIn ?
          <div className="right menu top">
          {
            userType === "student" ?
            <div className="right menu top"><Link to="/reservation" className="item menu"><div className="ui primary button"> + New Session </div></Link>
            <a onClick={ () => {
                this.props.history.push('/')
                this.props.handleLogout()}}
              className="item menu"><div className="ui primary button">Log Out</div></a></div> : <a onClick={this.props.handleLogout} className="item menu"><div className="ui primary button">Log Out</div></a>
          } </div> :  <Link to="/" className="item right menu ">
              <div className="ui primary button right">Log In</div>
          </Link>
        }

      </div>
    )
  }
}

export default withRouter(Navbar)
