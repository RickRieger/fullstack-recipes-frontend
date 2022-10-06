import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import setAxiosAuthToken from '../utils/setAxiosAuthToken';
import './Nav.css';

export class Nav extends Component {
  state = {
    open: false,
  };

  handleSideNavToggle = () => {
    if (this.state.open) {
      this.setState({
        open: false,
      });
    }
  };
  handleUserLogout = () => {
    this.handleSideNavToggle();
    window.localStorage.removeItem('jwtToken');
    setAxiosAuthToken(null);
    this.setState({
      user: null,
    });
    this.props.history.push('/');
  };
  render() {
    return (
      <>
        <header>
          <nav>
            {this.props.user ? (
              <img id='logo' src='appetizing-logo.png' alt='logo' />
            ) : (
              <Link to='/'>
                <img id='logo' src='appetizing-logo.png' alt='logo' />
              </Link>
            )}
            <ul
              className='nav-links'
              style={{
                transform: this.state.open ? 'translateX(0px)' : '',
              }}
            >
              <li>
                {this.state.open ? (
                  <Link to='/'>
                    <img
                      id='logo-side-nav'
                      src='appetizing-logo.png'
                      alt='logo'
                      onClick={() => this.handleSideNavToggle()}
                    />
                  </Link>
                ) : (
                  ''
                )}
              </li>
              <li>
                {this.props.user ? (
                  <NavLink
                    activeClassName='selected'
                    to='/recipe'
                    activeStyle={{ borderBottom: '1px solid #00ff00' }}
                    onClick={() => this.handleSideNavToggle()}
                  >
                    Recipes
                  </NavLink>
                ) : (
                  ''
                )}
              </li>
              <li>
                {this.props.user ? (
                  <NavLink
                    activeClassName='selected'
                    to='/grocery'
                    activeStyle={{ borderBottom: '1px solid #00ff00' }}
                    onClick={() => this.handleSideNavToggle()}
                  >
                    Shopping List
                  </NavLink>
                ) : (
                  ''
                )}
              </li>
              <li>
                {this.props.user ? (
                  <NavLink
                    activeClassName='selected'
                    to='/friends'
                    activeStyle={{ borderBottom: '1px solid #00ff00' }}
                    onClick={() => this.handleSideNavToggle()}
                  >
                    Friends
                  </NavLink>
                ) : (
                  ''
                )}
              </li>

              <li>
                {this.props.user ? (
                  <NavLink
                    activeClassName='selected'
                    to='/saved-recipes'
                    activeStyle={{ borderBottom: '1px solid #00ff00' }}
                    onClick={() => this.handleSideNavToggle()}
                  >
                    Saved Recipes
                  </NavLink>
                ) : (
                  ''
                )}
              </li>

              <li>
                {this.props.user ? (
                  ''
                ) : (
                  <NavLink
                    to='/sign-up'
                    activeClassName='selected'
                    activeStyle={{ borderBottom: '1px solid #00ff00' }}
                    onClick={() => this.handleSideNavToggle()}
                  >
                    Sign Up
                  </NavLink>
                )}
              </li>
              <li>
                {this.props.user ? (
                  <NavLink to='/' onClick={this.props.handleUserLogout}>
                    Logout
                  </NavLink>
                ) : (
                  <NavLink
                    activeStyle={{ borderBottom: '1px solid #00ff00' }}
                    to='/login'
                    onClick={() => this.handleSideNavToggle()}
                  >
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
            <i
              onClick={() =>
                this.setState({
                  open: !this.state.open,
                })
              }
              className='fas fa-bars burger'
            ></i>
          </nav>
        </header>
      </>
    );
  }
}
export default Nav;
