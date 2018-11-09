import React, { Component } from 'react';
import {Grid } from 'react-bootstrap';
import './App.css';
import HeaderTypography from './header';
import Calculator from './calculator';
import styled from 'styled-components'

const StyledFooter = styled.div`
position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    color: #eea236;
    text-align: center;
`

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <HeaderTypography />
                
            </header>
            
            <Calculator />
           
            <StyledFooter>
                <p>Adventure Capital &copy; 2018 </p>
            </StyledFooter>
      </div>
    );
  }
}

export default App;
