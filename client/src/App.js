import React, {Component} from 'react';
import './App.css';
//import TestComponent from "./components/TestComponent";
import Home from "./components/Home";
import StreamPair from './pages/StreamPair'

class App extends Component {
  render() {
    return (
      <div>
        <StreamPair/>
      </div>
    );
  }
}

export default App;
