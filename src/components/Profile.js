import React from 'react'
import helper from '../services/helpers';

var dateFormat = require('dateformat')


const Profile = props =>{
    console.log("cool",props);
    const userType = props.currentUser.user_type
    const rate = props.currentUser.rate
    const studentSessions = props.currentUser.sessions
    const studentInstructors = props.currentUser.instructors
    const instructorSessions = props.currentUser.sessions
    const currentUser = props.currentUser.name

    console.log("SESSSIONS",studentSessions);
    console.log("MMNNMMNMM",studentInstructors);
    console.log("type", userType);
    console.log("profile", props.currentUser.name);
    console.log("INSTRUCTORSASASAS", studentInstructors);
    console.log("Reservations", props.currentUser.reservations); //somehow i have to push the return from newReservation to this array or  the parent in App.js


    const token = localStorage.getItem('token')
    if(!token){
      props.history.push('/')
    }


    return(
      <div className="ui grid">
        <div className="eight wide column">
          <h1> Welcome {userType} </h1>
          <img className='center' src={props.currentUser.picture} />
          <h2>Name: {props.currentUser.name}</h2>
          {
            rate ? <h2>Rate: ${props.currentUser.rate}/hr</h2> : null

          }
          <h2>Location: {props.currentUser.location}</h2>
          <h2>Rating: {props.currentUser.rating}</h2>
        </div>
        {
          currentUser !== undefined ?
          <div className="eight wide column ui grid">
            {userType === "student" ?
              <div>
              <div className="eight wide column"><h1> Sessions: {studentSessions.map(res => <li>Instructor Name: {res.instructor.name} <br /> Start Time: {dateFormat(res.start_time,"dddd, mmmm dS, yyyy, h:MM:ss TT")} <br /> End Time:{dateFormat(res.end_time,"dddd, mmmm dS, yyyy, h:MM:ss TT")}</li>)} </h1> <br /></div>

              <div><h1>Instructors
              {studentInstructors.map(i => <li>Name: {(i.name)} <br /> Location: {i.location}</li>)}
              </h1></div>
              </div>
                :
              <div className="eight wide column">
              <h1> Sessions </h1>
              {instructorSessions.map(res => <div className="four wide column">
                <div key={res.id} className="ui card">
                  <div className="content">
                     <p>Start Time: {dateFormat(res.start_time,"h:MM:ss TT")}</p>
                     <p>End Time: {dateFormat(res.end_time,"h:MM:ss TT")}</p>
                  </div>
                 <button className="ui button primary">Mark Complete</button>
                </div>
              </div>)
             }</div>
            }

          </div> : null
        }

      </div>
    )
}

export default Profile
