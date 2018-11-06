import React, { Component } from 'react';

import './App.css';
import HeaderTypography from './header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
       <HeaderTypography />
        </header>
      </div>
    );
  }
}

export default App;
