import React from 'react'
import api from '../services/api';


class Signup extends React.Component{

  constructor(props){
    super(props)
    this.state={
      username: "",
      password: "",
      name: "",
      location: "Manhattan",
      level: "",
      user_type: "instructor",
      picture: "",
      rate:""
    }
  }

  handleChange =(e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    api.auth.signup(this.state.username, this.state.password, this.state.name, this.state.location, this.state.level,this.state.user_type, this.state.picture, this.state.rate).then(res =>
    {console.log("RESaassa",res);
      this.props.history.push('/login')
  }
    )
  }

  render(){
    const {username, password, name, location, level, picture, user_type, rate} = this.state
    const boroughs = ["Manhattan", "Staten Island", "Brooklyn", "Queens", "Bronx"]
    const levels = ["Beginner", "Intermediate", "Expert"]
    return(
      <div className="bg3">
      <div className="ui container">
      <div className = "ui one column stackable center aligned page grid" style={{padding: '100px'}}>
        <div className="box2">
        <div className="column twelve wide" >
          <h1 className="signup">Sign Up</h1>
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            <div className="ui field">
              <label>User Type</label>
              <div className="radio">
                    <label>
                      <input className="ui radio checkbox" name="user_type" type="radio" value="instructor" checked={this.state.user_type === 'instructor'} onChange={this.handleChange} />
                      Instructor
                    </label>
              </div>
              <div className="radio">
                    <label>
                      <input className="ui radio checkbox" name="user_type" type="radio" value="student" checked={this.state.user_type === 'student'} onChange={this.handleChange}/>
                      Student
                    </label>
              </div>
              <label>Username</label>
              <input
                name="username"
                placeholder="username"
                value={username}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Name</label>
              <input
                name="name"
                placeholder="name"
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Location</label>
              <select className="ui selection dropdown" name="location" value={location} onChange={this.handleChange}>
                {boroughs.map(t=> <option>{t}</option>)}
              </select>
            </div>
            <div className="ui field">
              <label>Level</label>
              <select className="ui selection dropdown" name="level" value={level} onChange={this.handleChange}>
                {levels.map(t=> <option>{t}</option>)}
              </select>
            </div>
            <div className="ui field">
              <label>Picture</label>
              <input
                name="picture"
                placeholder="picture"
                value={picture}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Rate(Only if you are an Instructor)</label>
              <input
                name="rate"
                placeholder="Rate $"
                value={rate}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ui color1 button">
              Signup
            </button>
          </form>
        </div>
        </div>
        </div>
        </div>
        </div>
      </div>
    )
  }

}

export default Signup
