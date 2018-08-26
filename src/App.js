import React, { Component } from 'react';
import Ajax01 from './Ajax01';
import Ajax02 from './Ajax02';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="card horizontal">
          <div className="card-content">
            <span className="card-title grey-text text-darken-4">Axios</span>
            <Ajax01 />
          </div>
        </div>
        <div className="card horizontal">
          <div className="card-content">
            <span className="card-title grey-text text-darken-4">Observables</span>
            <Ajax02 />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
