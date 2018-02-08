import React from 'react'
import api from '../services/api';
import SessionCard from './SessionCard'

class SessionForm extends React.Component{
  // const token = localStorage.getItem('token')
  // if(!token){
  //   this.props.history.push('/')
  // }
  constructor(props) {
      super(props);
      this.state = {
        error: false,
        fields: {
          date: '',
          start_time: '',
          end_time: ''
        }
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

    return(
      <div>
      <h1 class="center header">New Session</h1>
      <div className="ui form">
        <input type="date" placeholder="Date"/>
        <input type="time"placeholder="Start Time"/>
        <input type="time"placeholder="End Time"/>
        <button class="ui button primary">Submit</button>
      </div>
      </div>
    )
  }
}

export default SessionForm
