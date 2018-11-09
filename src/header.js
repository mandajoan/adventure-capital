import React, { Component } from 'react';
import styled from 'styled-components'
import backgroundImage from './images/travel.png'

const StyledHeader = styled.section`
    background: url(${backgroundImage}) no-repeat center;
    background-size: auto;
    background-color: rgba(0,0,0,0.75);
    background-blend-mode: multiply;
  width: 100%;
  height: 300px;
`;

const StyledPOne = styled.p`
    font-family: 'Source Sans Pro', sans-serif;
    display: inline-block;
    font-size: .75em;
    font-weight: 900;
    margin: 0;
    line-height: 1;

    @media only screen and (max-width: 465px) {
        display: block;
        position: absolute;
        top: -25%;
        left: 50%;
        transform: translateX(-50%);
    }
`
const StyledPTwo = styled.p`
  font-family: 'Source Sans Pro', sans-serif;
    display: inline-block;
    font-size: .80em;
    font-weight: 100;
    margin: 0;
    line-height: 1;
    color: #f0ad4e;

    @media only screen and (max-width: 465px) {
        position: relative;
        top: 0.6em;
    }
`

const StyledLogo = styled.p`
 font-size: 50px;
    padding: 30px 0px;
    font-family: 'Caveat', cursive;
@media only screen and (max-width: 465px) {
    
        font-size: 45px;
    
    
}
`


class HeaderTypography extends Component {
    componentDidMount() {
        window.headerAnimation()
    }
    render() {
        return (
            <StyledHeader className="hero">
                <div className="inner-text">
                    <StyledPOne className="p1">LET'S&nbsp;</StyledPOne>
                    <StyledPTwo className="p2">EXPLORE</StyledPTwo>
                    <br />
                    
                </div>
                <div>
                    <StyledLogo id="logo">ADVENTURE CAPITAL</StyledLogo>
                </div>
             
            </StyledHeader>
            
            
            
            )
    }
}

export default HeaderTypography;