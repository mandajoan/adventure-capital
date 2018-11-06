import React, { Component } from 'react';


class HeaderTypography extends Component {
    componentDidMount() {
        window.headerAnimation()
    }
    render() {
        return (
            <section className="hero">
                <div className="inner-text">
                    <p className="p1">LET'S&nbsp;</p>
                    <p className="p2">EXPLORE</p>
                    <br />
                    
                </div>
                <div>
                    <p id="logo">ADVENTURE CAPITAL</p>
                </div>
             
            </section>
            
            
            
            )
    }
}

export default HeaderTypography;