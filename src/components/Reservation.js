import React from 'react'
import api from '../services/api';
import SessionCard from './SessionCard'

class Reservation extends React.Component{
  // const token = localStorage.getItem('token')
  // if(!token){
  //   this.props.history.push('/')
  // }
  constructor() {
      super();
      this.state = {
        error: false,
        sessions: []
      };
    }

  componentDidMount(){
    api.auth.getSessions().then(res =>{
      console.log("Sessions",res);
      this.setState({sessions:res})
    })
  }


  render(){
    console.log("Reservation state render",this.state.sessions);
    const sessions = this.state.sessions.map((session,index)=> <SessionCard session={session} key={index}/>)
    // const session = this.state.sessions.map(s => s.start_time)

    return(
      <div className=" ui grid container ">
          {sessions}
      </div>
    )
  }
}

export default Reservation
