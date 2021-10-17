import React, { Component } from 'react';
import Axios from '../utils/Axios';
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from 'validator';
import { toast } from 'react-toastify';
// import checkIfUserIsAuth from "../utils/checkIsUserIsAuth";
import './Signup.css';

export class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstNameError: '',
    lastNameError: '',
    userNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    isButtonDisabled: true,
    firstNameOnFocus: false,
    lastNameOnFocus: false,
    emailOnFocus: false,
    userNameOnFocus: false,
    passwordOnFocus: false,
    onConfirmPasswordOnFocus: false,
  };

  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (
          event.target.name === 'firstName' ||
          event.target.name === 'lastName'
        ) {
          this.handleFirstNameAndLastNameInput(event);
        }
        if (event.target.name === 'userName') {
          this.handleUsernameInput();
        }
        if (event.target.name === 'password') {
          this.handlePasswordInput();
        }
        if (event.target.name === 'email') {
          this.handleEmailInput();
        }
        if (event.target.name === 'password') {
          this.handlePasswordInput();
        }
        if (event.target.name === 'confirmPassword') {
          if (this.state.password !== this.state.confirmPassword) {
            this.setState({
              confirmPasswordError: 'Passwords do not match',
              isButtonDisabled: true,
            });
          } else {
            this.setState({
              confirmPasswordError: '',
            });
          }
        }
      }
    );
  };

  handleFirstNameAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) {
      if (isAlpha(this.state[event.target.name])) {
        this.setState({
          //bracket notation/dynamic use of code for first and last name reset error
          [`${event.target.name}Error`]: '',
        });
      } else {
        //bracket notation/dynamic use of code set error
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
          isButtonDisabled: true,
        });
      }
    } else {
      //bracket notation/dynamic use of code to set other error
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  handleUsernameInput = () => {
    if (this.state.userName.length === 0) {
      this.setState({
        userNameError: 'User name cannot be empty',
        isButtonDisabled: true,
      });
    } else {
      if (isAlphanumeric(this.state.userName)) {
        this.setState({
          userNameError: '',
        });
      } else {
        this.setState({
          userNameError: 'User name cannot contain special characters',
          isButtonDisabled: true,
        });
      }
    }
  };

  handleEmailInput = () => {
    if (this.state.email.length === 0) {
      this.setState({
        emailError: 'Email cannot be empty',
        isButtonDisabled: true,
      });
    } else {
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: '',
        });
      } else {
        this.setState({
          emailError: 'Please enter a valid email',
          isButtonDisabled: true,
        });
      }
    }
  };
  handlePasswordInput = () => {
    if (this.state.onConfirmPasswordOnFocus) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          confirmPasswordError: 'Password does not match',
          isButtonDisabled: true,
        });
      } else {
        this.setState({
          confirmPasswordError: '',
        });
      }
    }
    if (this.state.password.length === 0) {
      this.setState({
        passwordError: 'Password cannot be empty',
        isButtonDisabled: true,
      });
    } else {
      if (isStrongPassword(this.state.password)) {
        this.setState({
          passwordError: '',
        });
      } else {
        this.setState({
          passwordError:
            'Passwords must be at least 8 characters long, and contain at least one uppercase letter, lowercase letter, special character and number.',
          isButtonDisabled: true,
        });
      }
    }
  };

  handleOnBlur = (event) => {
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isButtonDisabled === true) {
      if (
        this.state.firstNameOnFocus &&
        this.state.lastNameOnFocus &&
        this.state.emailOnFocus &&
        this.state.userNameOnFocus &&
        this.state.passwordOnFocus &&
        this.state.confirmPasswordOnFocus
      ) {
        if (
          this.state.firstNameError.length === 0 &&
          this.state.lastNameError.length === 0 &&
          this.state.userNameError.length === 0 &&
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.confirmPasswordError.length === 0 &&
          this.state.password === this.state.confirmPassword
        ) {
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  }

  handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      let userInputObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        userName: this.state.userName,
        password: this.state.password,
      };
      await Axios.post('/user/sign-up', userInputObj);
      toast.success(`User created - Please login`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  render() {
    const {
      firstNameError,
      lastNameError,
      userNameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;
    return (
      <div className='signup__body'>
        <form className='signup__form' onSubmit={this.handleOnSubmit}>
          <h1>Create an account</h1>
          <br />
          <h4>Sign up and have fun!</h4>
          <br />
          <div className='form-group'>
            <label>Firstname</label>

            <input
              className='form-control'
              type='text'
              name='firstName'
              placeholder='First name'
              id='firstName'
              required
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
              onFocus={this.handleInputOnFocus}
              autoFocus
            />
          </div>
          <div className='errorMessage'>{firstNameError && firstNameError}</div>
          <div className='form-group'>
            <label>Lastname</label>
            <input
              className='form-control'
              type='text'
              name='lastName'
              placeholder='Last name'
              id='lastName'
              required
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
              onFocus={this.handleInputOnFocus}
            />
          </div>
          <div className='errorMessage'>{lastNameError && lastNameError}</div>
          <div className='form-group'>
            <label>Username</label>
            <input
              className='form-control'
              type='text'
              name='userName'
              placeholder='User name'
              id='userName'
              required
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
              onFocus={this.handleInputOnFocus}
            />
          </div>
          <div className='errorMessage'>{userNameError && userNameError}</div>
          <div className='form-group'>
            <label>Email</label>
            <input
              className='form-control'
              type='text'
              name='email'
              placeholder='Email'
              id='email'
              required
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
              onFocus={this.handleInputOnFocus}
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
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
              onFocus={this.handleInputOnFocus}
            />
          </div>
          <div className='errorMessage'>{passwordError && passwordError}</div>
          <div className='form-group'>
            <label>ConfirmPassword</label>
            <input
              className='form-control'
              type='password'
              name='confirmPassword'
              placeholder='Confirm password'
              id='confirmPassword'
              required
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
              onFocus={this.handleInputOnFocus}
            />
          </div>
          <div className='errorMessage'>
            {confirmPasswordError && confirmPasswordError}
          </div>
          <div>
            <ul className='list-inline'>
              <li>
                <input
                  className='btn btn--form'
                  type='submit'
                  value='Signup'
                  disabled={this.state.isButtonDisabled}
                />
              </li>
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
