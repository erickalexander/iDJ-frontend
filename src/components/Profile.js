import React from 'react'
import helper from '../services/helpers';
import api from '../services/api';

var dateFormat = require('dateformat')


const Profile = props =>{
    console.log("cool",props);
    const userType = props.currentUser.user_type
    const rate = props.currentUser.rate
    const studentSessions = props.currentUser.sessions
    const studentInstructors = props.currentUser.instructors
    const instructorSessions = props.currentUser.sessions
    const currentUser = props.currentUser.name
    const completed_status = props.currentUser.completed_status
    console.log("SESSSIONS",studentSessions);
    console.log("MMNNMMNMM",studentInstructors);
    console.log("type", userType);
    console.log("profile", props.currentUser.name);
    console.log("INSTRUCTORSASASAS", studentInstructors);
    console.log("Reservations", props.currentUser.reservations); //somehow i have to push the return from newReservation to this array or  the parent in App.js
    console.log("INSTSESSIONS", instructorSessions)
    var now = new Date();

    console.log("NOWW",dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"));
    const token = localStorage.getItem('token')
    if(!token){
      props.history.push('/')
    }

    const sessionId = props.currentUser.sessions
    const complete = true

    const handleComplete = (id) =>{
      console.log("CLICK",id);
      let data = [id,true]
      console.log("INSIDE CLICK APPOITMENTS",data);
      api.sessions.markComplete(data).then(res =>{
        console.log("RESPONSEE! COMPLETED SESSION",res);
        props.handleComplete(res)
      })
      window.location.reload()
    }
    const true1 = props.currentUser.sessions ? props.currentUser.sessions.map(s => s.completed_status === true) : null

    return(
      <div className="ui grid">
        <div className="eight wide column">
          <h1> Welcome {userType} </h1>
          <img className='center' src={props.currentUser.picture} />
          <h2>Name: {props.currentUser.name}</h2>
          {
            rate ? <h2>Rate: ${props.currentUser.rate}/hr</h2>: null

          }

          <h2>Location: {props.currentUser.location}</h2>
          <h2>Rating: {props.currentUser.rating}</h2>

        </div>
        {
          currentUser !== undefined ?
          <div className="eight wide column ui grid">
            {userType === "student" ?
              <div>
              <div className="eight wide column">
                <h1> Upcoming Sessions</h1>
                {studentSessions.map(res => (res.status === "active" && res.completed_status === false) ?  <div className="four wide column">
                  <div key={res.id} className="ui card">
                    <div className="content">
                       <p>Instructor: {res.instructor.name}</p>
                       <p>Date: {dateFormat(res.start_time,"dddd, mmmm dS, yyyy")}</p>
                       <p>Start Time: {dateFormat(res.start_time,"h:MM:ss TT")}</p>
                       <p>End Time: {dateFormat(res.end_time,"h:MM:ss TT")}</p>
                    </div>
                  </div>
                </div> :null)}
                <div className="eight wide column">
                  <h1> Completed Sessions</h1>
                  {studentSessions.map(res => (res.completed_status !== false && res.status === "active") ?  <div className="four wide column">
                    <div key={res.id} className="ui card">
                      <div className="content">
                         <p>Instructor: {res.instructor.name}</p>
                         <p>Date: {dateFormat(res.start_time,"dddd, mmmm dS, yyyy")}</p>
                         <p>Start Time: {dateFormat(res.start_time,"h:MM:ss TT")}</p>
                         <p>End Time: {dateFormat(res.end_time,"h:MM:ss TT")}</p>
                         <button className="ui button primary">Leave a Rating</button>

                      </div>
                    </div>
                  </div> :null)}
              </div>
            </div>
          </div>
                :
              <div>
              <div className="eight wide column">
              <h1> Upcoming Appoitments </h1>
              {instructorSessions.map(res => (res.status === "active" && res.completed_status === false) ? <div className="four wide column">
                <div key={res.id} className="ui card">
                  <div className="content">
                     <p>Student: {res.student.name}</p>
                     <p>Date: {dateFormat(res.start_time,"dddd, mmmm dS, yyyy")}</p>
                     <p>Start Time: {dateFormat(res.start_time,"h:MM:ss TT")}</p>
                     <p>End Time: {dateFormat(res.end_time,"h:MM:ss TT")}</p>
                  </div>
                 <button onClick={() => handleComplete(res.id)} className="ui button primary">Mark Complete</button>
                </div>
              </div> : null)
             }</div>
             <div className="eight wide column">
             <h1> Available Sessions Not Yet Booked </h1>
             {instructorSessions.map(res => res.status !== "active" ? <div className="four wide column">
               <div key={res.id} className="ui card">
                 <div className="content">
                    <p>Date: {dateFormat(res.start_time,"dddd, mmmm dS, yyyy")}</p>
                    <p>Start Time: {dateFormat(res.start_time,"h:MM:ss TT")}</p>
                    <p>End Time: {dateFormat(res.end_time,"h:MM:ss TT")}</p>
                 </div>
               </div>
             </div> : null)
           }</div>
           <div className="eight wide column">
           <h1> Sessions Completed </h1>
           {instructorSessions.map(res => res.completed_status !== false ? <div className="four wide column">
             <div key={res.id} className="ui card">
               <div className="content">
                  <p>Student: {res.student.name}</p>
                  <p>Date: {dateFormat(res.start_time,"dddd, mmmm dS, yyyy")}</p>
                  <p>Start Time: {dateFormat(res.start_time,"h:MM:ss TT")}</p>
                  <p>End Time: {dateFormat(res.end_time,"h:MM:ss TT")}</p>
                  <h1>COMPLETED</h1>
               </div>
             </div>
           </div> : null)
         }</div>
          </div>
            }

          </div> : null
        }

      </div>
    )
}

export default Profile
