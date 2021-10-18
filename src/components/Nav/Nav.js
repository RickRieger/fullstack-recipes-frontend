import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.css';

export class Nav extends Component {
  state = {
    open: true,
  };
  render() {
    console.log(this.state.open);
    return (
      <>
        <header>
          <nav>
            <Link to='/'>
              <img id='logo' src='appetizing-logo.png' alt='logo' />
            </Link>
            <ul
              className='nav-links'
              style={{
                transform: this.state.open ? 'translateX(0px)' : '',
              }}
            >
              <li>
                {this.props.user ? (
                  <NavLink
                    activeClassName='selected'
                    to='/recipe'
                    activeStyle={{ borderBottom: '1px solid #00ff00' }}
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
                    onClick={this.handleOnClick2}
                    activeStyle={{ borderBottom: '1px solid #00ff00' }}
                  >
                    Sign Up
                  </NavLink>
                )}
              </li>
              <li>
                {this.props.user ? (
                  <NavLink
                    activeStyle={{ borderBottom: '1px solid #00ff00' }}
                    to='/login'
                    onClick={this.props.handleUserLogout}
                  >
                    Logout
                  </NavLink>
                ) : (
                  <NavLink
                    activeStyle={{ borderBottom: '1px solid #00ff00' }}
                    to='/login'
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
