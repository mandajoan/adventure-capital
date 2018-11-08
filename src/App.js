import React, { Component } from 'react';

import './App.css';
import HeaderTypography from './header';
import Calculator from './calculator'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
                <HeaderTypography />
                
            </header>
            <Calculator />
      </div>
    );
  }
}

export default App;
