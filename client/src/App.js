import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import './App.css';
import ProjectList from './projects/projectList';
import SingleProject from './projects/singleProject';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={ProjectList} />
        <Route exact path='/:projectID' component={SingleProject} />
      </div>
    );
  }
}

export default App;
