import React from 'react'
import api from '../services/api';
import SessionCard from './SessionCard'

class Session extends React.Component{
  // const token = localStorage.getItem('token')
  // if(!token){
  //   this.props.history.push('/')
  // }
  constructor(props) {
      super(props);
      this.state = {
        error: false,
        sessions: [],
        // currentUser:props.currentUser
      };
    }

  componentDidMount(){
    api.sessions.getSessions().then(res =>{
      console.log("Sessions",res);
      this.setState({sessions:res})
    })
  }


  render(){
    console.log("Reservation state render",this.state.sessions);
    console.log("RESSSSS", this.props.currentUser.reservations);
    const userLocation = this.props.currentUser.location
    const userSessions = this.props.currentUser.reservations
    console.log("SASASAS",userSessions);
    const sessions = this.state.sessions.map((session) => ((session.instructor.location === this.props.currentUser.location)&&(session.student === null)) ? <SessionCard session={session} key={session.id} currentUser={this.props.currentUser} history={this.props.history} handleSubmit={this.props.handleSubmit}/> : null)
    console.log("SSSSSS",sessions);
    return(
      <div className=" ui grid container ">
      {sessions}
      </div>
    )
  }
}

export default Session
