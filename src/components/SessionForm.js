import React from 'react'
import api from '../services/api';
import SessionCard from './SessionCard'

class SessionForm extends React.Component{

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
  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };      this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    let data = [this.props.currentUser.id,this.state.fields]
    console.log("DATA 1", data);
    api.sessions.newSession(data).then(res =>{
      console.log("RESPONSE",res);
    this.props.handleNewSession(res)
  })
  };

  componentDidMount(){
    api.sessions.getSessions().then(res =>{
      console.log("Sessions",res);
      this.setState({sessions:res})
    })
  }


  render(){
    const token = localStorage.getItem('token')
    if(!token){
      this.props.history.push('/')
    }
    console.log("Reservation state render",this.state.sessions);
    console.log("RESSSSS", this.props.currentUser.reservations);
    const userLocation = this.props.currentUser.location
    const userSessions = this.props.currentUser.reservations
    console.log("SASASAS",userSessions);
    const { fields } = this.state;
    var times = []
      , periods = ['am', 'pm']
      , hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      , prop = null
      , hour = null
      , min = null;

    for (prop in periods) {
      for (hour in hours) {
        for (min = 0; min < 60; min += 30) {
          times.push(('0' + hours[hour]).slice(-2) + ':' + ('0' + min).slice(-2) + " " + periods[prop]);
        }
      }
    }
    console.log(times);

    return(
      <div className="bg2">
      <div className="ui container">
      <div style={{padding: '100px'}}>
      <div className="box3">
      <h1>New Session</h1>
      <form className="ui form" onSubmit={this.handleSubmit}>
        <label>Date</label>
        <input className="ui dropdown" name="date" type="date" value={fields.date} onChange={this.handleChange} />
        <label>Start Time</label>
        <select className="ui dropdown" name="start_time" value={fields.start_time} onChange={this.handleChange}>
          {times.map(t=> <option>{t}</option>)}
        </select>
        <label>End Time</label>
        <select className="ui dropdown" name="end_time" value={fields.end_time} onChange={this.handleChange}>
          {times.map(t=> <option>{t}</option>)}
        </select>
        <button type="submit" class="ui button primary">Submit</button>
      </form>
      </div>
      </div>
      </div>
      </div>
    )
  }
}

export default SessionForm
