import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component{
  render(){
    const loggedIn = !!this.props.currentUser.id
    const userType = this.props.currentUser.user_type
    let arr = []
    const earnings = this.props.currentUser.sessions? this.props.currentUser.sessions.map(s => s.completed_status === true) : null
    let x = earnings ? earnings.filter(i => i === true).length : null
    console.log("DFDF",x);
    let total = x * this.props.currentUser.rate
     console.log("TOTAL",total);
    return (
      <div className="ui fixed inverted top menu">
        {
          loggedIn ? <Link to="/profile" className="header item">
            <img src='https://retrocdn.net/images/thumb/c/c5/Logo-vinyl.svg/370px-Logo-vinyl.svg.png' />
            <h1>IDJ</h1>
          </Link> :
        <Link to="/" className="header item">
          <img src='https://retrocdn.net/images/thumb/c/c5/Logo-vinyl.svg/370px-Logo-vinyl.svg.png' />
          <h1>IDJ</h1>
        </Link>

        }

        {
          loggedIn ? <div className="left menu top">
          <div className="item">{`${this.props.currentUser.user_type} Portal` }</div>
          <a className="item menu"><button className="ui color1 button"><Link to="/profile">
            Profile
          </Link></button></a> </div> :null
        }
        {
          loggedIn ?
          <div className="right menu top">
          {
            userType === "student" ?
            <div className="right menu top"><Link to="/reservation" className="item menu"><div className="ui color1 button"> + New Reservation </div></Link>
            <a onClick={ () => {
                this.props.history.push('/')
                this.props.handleLogout()}}
              className="item menu"><div className="ui button color1" >Log Out</div></a></div> : <div className="right menu top"><div className="item menu"><h1>Earnings:${total}</h1></div><Link to="/newsession" className="item menu"><div className="ui color1 button"> + New Session </div></Link> <a onClick={this.props.handleLogout} className="item menu"><div className="ui color1 button">Log Out</div></a></div>
          } </div> :  <Link to="/login" className="item right menu ">
              <div className="ui color1 button right">Log In</div>
          </Link>
        }

      </div>
    )
  }
}

export default withRouter(Navbar)
