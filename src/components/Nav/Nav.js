import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.css';

export class Nav extends Component {
  handleOnClick = () => {
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    nav.classList.toggle('nav-active');
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.6
        }s`;
      }
    });
  };
  handleOnClick2 = () => {
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    nav.classList.toggle('nav-active');
    // navLinks.forEach((link, index) => {
    //   if (link.style.animation) {
    //     link.style.animation = '';
    //   } else {
    //     link.style.animation = `navLinkFade 0.5s ease forwards ${
    //       index / 7 + 0.6
    //     }s`;
    //   }
    // });
  };

  render() {
    return (
      <>
        <header>
          <nav>
            <Link to="/">
              <img id="logo" src="appetizing-logo.png" alt="logo" />
            </Link>
            <ul className="nav-links">
            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/recipe">
                  Get Recipes
                </NavLink>
              ) : (
                ""
              )}
            </li>
              <li>
                <NavLink
                  to="/sign-up"
                  activeClassName="selected"
                  onClick={this.handleOnClick2}
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
              {this.props.user ? (
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/login"
                  onClick={this.props.handleUserLogout}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
            </ul>
            <div onClick={this.handleOnClick} className="burger">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          </nav>
        </header>
      </>
    );
  }
}
export default Nav;
