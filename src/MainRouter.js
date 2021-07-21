import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Recipe from "./components/Recipe/Recipe";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const MainRouter = (props) => {
  return (
    <Router>
      <Nav user={props.user} handleUserLogout={props.handleUserLogout} />
      <>
      <PrivateRoute exact path="/recipe" component={Recipe} />
        <Route 
        exact 
        path="/sign-up" 
        component={Signup} 
          
        />

        <Route
          exact
          path="/login"
          render={(routerProps) => (
            <Login {...routerProps} handleUserLogin={props.handleUserLogin} />
          )}
        />
        <Route 
        exact 
        path="/" 
        component={Home} />

      </>
    
    </Router>
  );
};

export default MainRouter;
