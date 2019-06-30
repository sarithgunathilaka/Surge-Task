import React, { Component } from 'react'
import { Alert, Button } from 'reactstrap';
import Dashboard from './Dashboard'
import 'whatwg-fetch';





export default class Login extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: false,
            token: '',
            signUpError: '',
            signInError: '',
            signInEmail: '',
            signInPassword: '',
        };
    
      this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
      this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    
    
      this.onSignIn = this.onSignIn.bind(this);
    }

      onTextboxChangeSignInEmail(event) {
        this.setState({
          signInEmail: event.target.value,
        });
      }
    
      onTextboxChangeSignInPassword(event) {
        this.setState({
          signInPassword: event.target.value,
        });
      }

      redirectSignUp = () => {
        console.log('test');
        this.props.history.push('/register');
      }

      onSignIn() {
        // Grab state
        const {
          signInEmail,
          signInPassword,
        } = this.state;
    
        this.setState({
          isLoading: true,
        });
    
        // Post request to backend
        fetch('users/login', {
          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: signInEmail,
            password: signInPassword,
          }),
          
        }).then(res => res.json())
          .then(json => {
            console.log('json', json);
            if (json.success) {
              //setInStorage('the_main_app', { token: json.token });
              this.setState({
                signInError: json.message,
                isLoading: false,
                signInPassword: '',
                signInEmail: '',
                token: json.token,
              });
            } else {
              this.setState({
                signInError: json.message,
                isLoading: false,
              });
            }
          });
      }

    render() {
        
        const {
          isLoading,
          token,
          signInError,
          signInEmail,
          signInPassword,
         
        } = this.state;
    
        if (isLoading) {
          return (<div><p>Loading...</p></div>);
        }
    
        if (!token) {
          return (
            <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                {
                 
                  (signInError) ? (
                    <div> <Alert color="danger">
                    {signInError} 
                          </Alert>
                    </div>
                  ) : (null)
                }
                    <form noValidate onSubmit={this.onSignIn}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                value={signInEmail}
                                onChange={this.onTextboxChangeSignInEmail} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={signInPassword}
                                onChange={this.onTextboxChangeSignInPassword} />
                        </div>
                        <button className="btn btn-lg btn-primary btn-block">
                            Sign in
                        </button>
                    </form>
                    <div className="col-md-6 mt-5 mx-auto">
                    <Button onClick={this.redirectSignUp} color="link" size="sm" block>Sign Up</Button>
                      </div>
                </div>
            </div>
        </div>
        );
          
      }
    
        return (
          <Dashboard />
        );
      }
}

