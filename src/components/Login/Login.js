import React, { Component } from 'react';
import { isEmpty } from 'validator';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import Axios from '../utils/Axios';
import checkIfUserIsAuth from '../utils/checkIsUserIsAuth';
import setAxiosAuthToken from '../utils/setAxiosAuthToken';

import './Login.css';

export class Login extends Component {
  state = {
    email: '',
    emailError: '',
    emailOnFocus: false,
    password: '',
    passwordError: '',
    passwordOnFocus: false,
    submitButtonDisabled: true,
  };

  componentDidMount() {
    let isAuth = checkIfUserIsAuth();
    if (isAuth) {
      this.props.history.push('/recipe');
    }
  }

  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (event.target.name === 'email') {
          if (isEmpty(this.state.email)) {
            this.setState({
              emailError: 'Email cannot be empty',
              submitButtonDisabled: true,
            });
          } else {
            this.setState({
              emailError: '',
            });
          }
        }
        if (event.target.name === 'password') {
          if (isEmpty(this.state.password)) {
            this.setState({
              passwordError: 'Password cannot be empty',
              submitButtonDisabled: true,
            });
          } else {
            this.setState({
              passwordError: '',
            });
          }
        }
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.submitButtonDisabled === true) {
      if (this.state.emailOnFocus && this.state.passwordOnFocus) {
        if (
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0
        ) {
          this.setState({
            submitButtonDisabled: false,
          });
        } else {
          this.setState({
            submitButtonDisabled: true,
          });
        }
      }
    }
  }

  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };
  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let result = await Axios.post('/user/login', {
        email: this.state.email,
        password: this.state.password,
      });
      let jwtToken = result.data.payload;

      //setting jwt token to out Axios instance
      setAxiosAuthToken(jwtToken);

      let decodedToken = jwtDecode(jwtToken);

      this.props.handleUserLogin(decodedToken);
      window.localStorage.setItem('jwtToken', jwtToken);
      toast.success('Login success!');
      this.props.history.push('/recipe');
    } catch (e) {
      console.log('error here----', e);
      if (e.response.status === 429) {
        toast.error(e.response.data);
      } else {
        toast.error(e.response.data.payload);
      }
    }
  };
  render() {
    const { email, emailError, password, passwordError, submitButtonDisabled } =
      this.state;
    return (
      <div
        className='login_body'
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.5)), url(banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          backgroundAttachment: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      >
        <form className='login__form' onSubmit={this.handleOnSubmit}>
          <h1>Log in</h1>
          <br />
          <br />
          <br />
          <div className='form-group'>
            <label>Email</label>
            <input
              className='form-control'
              type='email'
              name='email'
              placeholder='email'
              id='email'
              required
              value={email}
              onChange={this.handleOnChange}
              onFocus={this.handleInputOnFocus}
              autoFocus
            />
          </div>
          <div className='errorMessage'>{emailError && emailError}</div>
          <div className='form-group'>
            <label>Password</label>
            <input
              className='form-control'
              type='password'
              name='password'
              placeholder='Password'
              id='password'
              required
              value={password}
              onChange={this.handleOnChange}
              onFocus={this.handleInputOnFocus}
            />
          </div>
          <div className='errorMessage'>{passwordError && passwordError}</div>
          <div className='m-t-lg'>
            <ul className='list-inline'>
              <li>
                <input
                  className='btn btn--form'
                  type='submit'
                  value='Login'
                  disabled={submitButtonDisabled}
                />
              </li>
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
