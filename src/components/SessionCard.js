import React from 'react'
import api from '../services/api';
import { withRouter } from 'react-router-dom'
var dateFormat = require('dateformat')


const SessionCard = ({session,key,currentUser,handleSubmit,history}) => {
  console.log("S=USER", currentUser);
  let data = [session,currentUser]
  console.log("ALL DATA SESSION,CURRENTUSER",data);
  const handleClick = () => {
    console.log("INSIDE CLICK",data);
    console.log(session.id, "clicked");
    api.reservations.newReservation(data).then(res =>{
      console.log("RESPONSEE ISS!!",res);
      handleSubmit(res)
    })
  }

  return(

     <div className="four wide column">
       <div key={key} className="ui card">
         <div className="content">
            <p>Instructor: {session.instructor.name} </p>
            <p>Rate: ${session.instructor.rate}/hr </p>
            <p>Location: {session.instructor.location} </p>
            <p>Date: {dateFormat(session.start_time,"dddd, mmmm dS, yyyy")}</p>
            <p>Start Time: {dateFormat(session.start_time,"h:MM:ss TT")}</p>
            <p>End Time: {dateFormat(session.end_time,"h:MM:ss TT")}</p>
         </div>
        <button onClick={handleClick} className="ui button primary">Book Now</button>
       </div>
     </div>
   )
}

export default withRouter(SessionCard)
