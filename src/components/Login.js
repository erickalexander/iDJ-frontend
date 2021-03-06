import React from 'react'
import api from '../services/api';
import { Link} from 'react-router-dom'


class Login extends React.Component {
  constructor() {
      super();
      this.state = {
        error: false,
        fields: {
          username: '',
          password: ''
        }
      };
    }

    handleChange = e => {
      const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
      this.setState({ fields: newFields });
    };

    handleSubmit = e => {
      e.preventDefault();
      api.auth.login(this.state.fields).then(res =>{
        if (res.error) {
          this.setState({ error: true });
        } else {
          console.log("User is", res);

          this.props.handleLogin(res);
          this.props.history.push('/profile');
        }
      });
    };

    render(){
    const { fields } = this.state;

    return(
      <div className="bg2">
      <div className="ui container">
      <div className="ui middle aligned center aligned grid" style={{padding: '250px'}}>
        <div className="column">
          <div>
          <h2 className="ui color1 header image ">
            <img src="https://retrocdn.net/images/thumb/c/c5/Logo-vinyl.svg/370px-Logo-vinyl.svg.png" class="image"/>
            <div className="content center login">
              Log-in to your account
            </div>
          </h2>
          {this.state.error ? <h1>Try Again</h1> : null}
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="ui stacked secondary  segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input type="text" name="username" placeholder="Username"value={fields.username} onChange={this.handleChange} />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input type="password" name="password" placeholder="Password" value={fields.password} onChange={this.handleChange}/>
                </div>
              </div>
              <button type="submit" className="ui fluid large color1 submit button">Login</button>
            </div>

            <div className="ui error message"></div>

          </form>

          <div className="ui message">
            New to us? <Link to="signup">Register</Link>
          </div>
      </div>
    </div>
    </div>
    </div>
  </div>
      )
    }
}

export default Login
