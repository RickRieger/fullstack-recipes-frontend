import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Axios from '../utils/Axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import setAxiosAuthToken from '../utils/setAxiosAuthToken';
import './Home.css';
export class Home extends Component {
  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let result = await Axios.post('/user/login', {
        email: 'a@a.com',
        password: 'Apple251#',
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
      console.log(e);
      if (e.response.status === 429) {
        toast.error(e.response.data);
      } else {
        toast.error(e.response.data.payload);
      }
    }
  };

  render() {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div id='greeting'>
          <h1>Welcome to app-etizing recipes!</h1>
          <NavLink to='/sign-up'>
            <input className='btn home-btn' value='Signup' readOnly />
          </NavLink>
          <input
            className='btn home-btn'
            value='Guest user'
            onClick={this.handleOnSubmit}
            readOnly
          />
        </div>
      </div>
    );
  }
}

export default Home;
