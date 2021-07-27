import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Recipe from "./components/Recipe/Recipe";
import SavedRecipes from "./components/SavedRecipes/SavedRecipes";
import Grocery from "./components/Grocery/Grocery";
import Friends from "./components/Friends/CreateFriend";
import Text from "./components/Text/Text";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const MainRouter = (props) => {
  return (
    <Router>
      <Nav user={props.user} handleUserLogout={props.handleUserLogout} />

      <>
      <PrivateRoute exact path="/friends" component={Friends} />

      <PrivateRoute exact path="/grocery" component={Grocery} />

      <PrivateRoute exact path="/recipe" component={Recipe} />

      <PrivateRoute exact path="/text-friends" component={Text} />

      <PrivateRoute exact path="/saved-recipes" component={SavedRecipes} />

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
