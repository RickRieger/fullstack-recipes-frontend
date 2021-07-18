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

  render() {
    return (
      <>
        <body>
          <header>
            <nav>
              <Link to="/">
                <img id="logo" src="appetizing-logo.png" alt="logo" />
              </Link>
              <ul className="nav-links">
                <li>
                  <NavLink activeClassName="selected" to="/sign-up">
                    Sign up
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeStyle={{ borderBottom: '1px solid white' }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
              <div onClick={this.handleOnClick} className="burger">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
              </div>
            </nav>
          </header>
        </body>
      </>
    );
  }
}
export default Nav;
