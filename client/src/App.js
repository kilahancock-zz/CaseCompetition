import React, {Component} from 'react';
import './App.css';
//import TestComponent from "./components/TestComponent";
import Home from "./components/Home";
import { Link, Switch, Route, withRouter, BrowserRouter as Router } from 'react-router-dom';
import Admin from './components/Admin';
import Map from './components/Map';

class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
      </Router>
    );
  }
}

export default App;
