import React, {Component} from 'react';
import './App.css';
import TestComponent from "./components/TestComponent";
import StreamPair from './pages/StreamPair';

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
