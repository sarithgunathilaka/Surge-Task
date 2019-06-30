import React, { Component } from 'react'
import { Alert } from 'reactstrap';
import { Button } from 'reactstrap';


export default class Register extends Component {
    

    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
          token: '',
          signUpError: '',
          signInError: '',
          signUpfirstName: '',
          signUplastName: '',
          signUpEmail: '',
          signUpPassword: '',
        };
    
        this.onTextboxChangeSignUpfirstName = this.onTextboxChangeSignUpfirstName.bind(this);
        this.onTextboxChangeSignUplastName = this.onTextboxChangeSignUplastName.bind(this);
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

        this.onSignUp = this.onSignUp.bind(this);
    }

      onTextboxChangeSignUpfirstName(event) {
        this.setState({
          signUpfirstName: event.target.value
        });
      }
    
      onTextboxChangeSignUplastName(event) {
        this.setState({
          signUplastName: event.target.value
        });
      }
    
      onTextboxChangeSignUpEmail(event) {
        this.setState({
          signUpEmail: event.target.value
        });
      }
    
      onTextboxChangeSignUpPassword(event) {
        this.setState({
          signUpPassword: event.target.value
        });
      }

      redirectSignIn = () => {
        this.props.history.push('/');
      }

      onSignUp() {
        // Grab state
        const {
            
          signUpfirstName,
          signUplastName,
          signUpEmail,
          signUpPassword
        } = this.state;
    
        this.setState({
          isLoading: true,
        });
    
        // Post request to backend
        fetch('users/register', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            firstName: signUpfirstName,
            lastName: signUplastName,
            email: signUpEmail,
            password: signUpPassword
          }),
        }).then(res => res.json())
          .then(json => {
            console.log('json', json);
            if (json.success) {
              this.setState({
                signUpError: json.message,
                isLoading: false,
                signUpfirstName: '',
                signUplastName: '',
                signUpEmail: '',
                signUpPassword: ''
              });
            } else {
              this.setState({
                signUpError: json.message,
                isLoading: false
              });
            }
          });
      }

      render() {
        const {
          isLoading,
          token,
          signUpfirstName,
          signUplastName,
          signUpEmail,
          signUpPassword,
          signUpError
        } = this.state;
    
      
    
        if (!token) {
          return (
           
            

            
        <div className="container">
            <div className="row">
               
                <div className="col-md-6 mt-5 mx-auto">
                {
                 
                 (signUpError) ? (
                   <div> <Alert color="dark">
                   {signUpError} 
                         </Alert>
                   </div>
                 ) : (null)
               }
                    <form noValidate onSubmit={this.onSignUp}>
                        <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="firstName"
                                className="form-control"
                                
                                placeholder="First Name"
                                value={signUpfirstName}
                                onChange={this.onTextboxChangeSignUpfirstName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="lastName"
                                className="form-control"
                                name="lastName"
                                placeholder="Last Name"
                                value={signUplastName}
                                onChange={this.onTextboxChangeSignUplastName} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                value={signUpEmail}
                                onChange={this.onTextboxChangeSignUpEmail} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={signUpPassword}
                                onChange={this.onTextboxChangeSignUpPassword} />
                        </div>
                      
                        
                    </form>
                    
                    <Button onClick={this.onSignUp} color="primary" size="lg" block>Sign up</Button>
                   
                    <div className="col-md-6 mt-5 mx-auto">
                    <Button onClick={this.redirectSignIn} color="link" size="sm" block>Sign </Button>
                      </div>
                </div>
            </div>
        </div>
          
           
        );
      }
      
       
      }
}
