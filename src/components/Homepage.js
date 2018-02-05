import React from 'react'

const Homepage = props =>{
  const token = localStorage.getItem('token')
  if(!token){
    props.history.push('/')
  }
    return(
      <div className=" header center">
        Welcome
      </div>
    )
}

export default Homepage
