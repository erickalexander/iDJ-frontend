import React from 'react'
import { Link} from 'react-router-dom'

class Homepage extends React.Component{
  render(){
    return(
        <div className="bg App" style={{padding: '100px'}}>
          <div className='box3'>
          <h1 className="home" >Welcome to IDJ</h1>
            <br /><br />
          <h1>The place where you can find your next mentor/instructor to start your DJ career</h1>
        <br /><br />
          <h1>Instructors or Students</h1>
            <br /><br /><br />
          <div>
            <Link to="/login" class="ui color1 button">
              Login
            </Link>
            <Link to="/signup"class="ui color1 button">
              SignUp
            </Link>
          </div>
          </div>
        </div>

    )}
}

export default Homepage
