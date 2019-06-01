import React, { Component } from 'react';
import logo from './logo.svg';
import Runner from './Runner/wpRunner.js'
import Pictures from './Pictures/wpPictures.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Runner/>
        <Pictures/>
        <div className="eventCode">קוד אירוע : 5126</div>
      </div>
    );
  }
}

export default App;
