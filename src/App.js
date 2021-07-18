import Nav from "./components/Nav/Nav";
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';


function App() {
  return (
    <Router>
      <Nav className="Navbar"/>
      <>
        <Route exact path="/sign-up" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </>
    </Router>
  );
}

export default App;
