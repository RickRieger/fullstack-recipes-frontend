import React, { Component } from 'react';
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from 'validator';
import './Signup.scss';

export class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }



  handleOnChange = (event) => {

    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      console.log(this.state, 'hello')
    );
  };





  render() {
    return (
      <div>
        <div className="signup__container">
          <div className="container__child signup__form">
          <h1 >Create an account</h1>
          <br />
          <h2 className="">Sign up and have fun!</h2>
          <br />
          <br />
            <form action="#">
              <div className="form-group">
                <label>Firstname</label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  id="firstname"
                  placeholder="james.bond"
                  required
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="warning">empty</div>
              <div className="form-group">
                <label>Lastname</label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  id="lastname"
                  placeholder="james.bond"
                  required
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  id="userName"
                  placeholder="james.bond"
                  required
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="james.bond@spectre.com"
                  required
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  required
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <label>Repeat Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="********"
                  required
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="m-t-lg">
                <ul className="list-inline">
                  <li>
                    <input
                      className="btn btn--form"
                      type="submit"
                      value="Signup"
                    />
                  </li>
                  <li>

                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
