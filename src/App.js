import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import MainRouter from './MainRouter';
import setAxiosAuthToken from './components/utils/setAxiosAuthToken';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
export class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    let getJwtToken = window.localStorage.getItem('jwtToken');
    if (getJwtToken) {
      const currentTime = Date.now() / 1000;
      let decodedJWTToken = jwtDecode(getJwtToken);
      if (decodedJWTToken.exp < currentTime) {
        //logout
        this.handleUserLogout();
      } else {
        //login
        this.handleUserLogin(decodedJWTToken);
      }
    }
  }

  handleUserLogin = (user) => {
    this.setState({
      user: {
        email: user.email,
      },
    });
  };

  handleUserLogout = () => {
    window.localStorage.removeItem('jwtToken');
    setAxiosAuthToken(null);
    this.setState({
      user: null,
    });
  };

  render() {
    return (
      <div
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.5)), url(banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'auto',
          backgroundAttachment: 'fixed',
        }}
      >
        <ToastContainer position='top-center' />
        <MainRouter
          user={this.state.user}
          handleUserLogin={this.handleUserLogin}
          handleUserLogout={this.handleUserLogout}
        />
      </div>
    );
  }
}
export default App;
