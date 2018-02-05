import React from 'react'
var dateFormat = require('dateformat')


const SessionCard = ({session,key}) => {

  return(

     <div className="four wide column">
       <div key={key} className="ui card">
         <div  className="content">
            <p>{dateFormat(session.start_time,"dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>
         </div>
        <button className="ui button primary">Book Now</button>
       </div>
     </div>
   )
}

export default SessionCard
