import React, { Component } from 'react';
import { FormGroup, Form, DropdownButton, MenuItem, InputGroup, Col, Grid, Row, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

//styled-components definitions 
const StyledButton = styled.button`
margin-top: 40px;
margin-bottom: 20px;
font-family: 'Caveat', cursive;
font-size: 30px;

`
const StyledButton2 = styled.button`

margin-bottom: 20px;
font-family: 'Caveat', cursive;
font-size: 30px;

`

const StyledContainer = styled.div`
width: 100%;

`

const StyledFormGroup = styled.div`
 width: 90%;
`

const StyledH4 = styled.h4`
margin: 0 auto;
color: black !important;
`
const StyledAlert = styled.div`
width: 80%;
margin: 0 auto;

`
const SpacingDiv = styled.div`
margin-top: 40px;
margin-bottom: 40px;
`
const StyledHead = styled.p`
font-family: 'Caveat', cursive;
font-weight: bold;
font-size: 30px;
`

const StyledP = styled.p`
font-size: 18px;
`

const MotivationalP = styled.p`
font-family: 'Caveat', cursive;
font-size: 25px;
color: black;
`

const StyledH3 = styled.h3`
color: darkgrey;
`


//definitions for dropdowns
//Goal was to allow user to search for city/location using Budget Your Trip API (suggest destinations if search had no results) but moved forward with my own api so decided to hardcode options in

const destinations = [{ "city": "Paris", "country": "France", "geonameId": 2988507 }, { "city": "Bangkok", "country": "Thailand", "geonameId": 1609350 }, { "city": "New York", "country": "United States", "geonameId": 5128581 }, { "city": "Bali", "country": "Indonesia", "geonameId": 1650535 }, { "city": "Istanbul", "country": "Turkey", "geonameId": 745044 }, { "city": "Lima", "country": "Peru", "geonameId": 3936456}]
const tripLength = [{"name": "2 days", "value": 2}, {"name": "1 Week", "value": 7}, {"name": "2 weeks", "value": 14}, {"name": "3 weeks", "value": 21}, {"name": "1 month", "value": 30} ]


class Calculator extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)   
        this.fetchTripCost = this.fetchTripCost.bind(this)
    
        this.state = {
            startDate: moment().toArray(),
            destination: '', 
            lengthOfTravel: '',
            dateOfTravel: '', 
            costPerDay:''
           
        }
        
    }
//handles dropdown change for date selector
    handleChange(date) {
        
        this.setState({
            leaveDate: date.toArray(), 
            selection: true
        }, () => this.calculateDateDifference())
     
    }
//calculates time left till trip using moment.js
    calculateDateDifference() {
        console.log(this.state.leaveDate)
        var todaysDate = moment(this.state.startDate)
        var leaveDate = moment(this.state.leaveDate)
        console.log(todaysDate)
        console.log(leaveDate)
        var days = leaveDate.diff(todaysDate, 'days')
        this.setState({
             daysTillTravel: days
        })
        
    }
//api request to adventure-capital backend 
    fetchTripCost(){
        console.log(this.state.destination)
        let URL = `https://adventure-capital-backend.herokuapp.com/location/${this.state.destination}`
        axios.get(URL, {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': "application/json"}})
        .then(response => {
            let tripCostResults = response.data
            this.setState({
                showResults: true, 
                results: tripCostResults, 
                disabled: true
            })
            
        })
    }


//adds selection indicator for active dropdown item for destinations
    toggleClass(index, e) {
        
        for (var i = 0; i <= destinations.length; i++) {
       
            if (i === index) {
                let choice = destinations[i].city
                this.setState({
                    activeIndex: index,
                  destination: choice
                },
                    () => console.log(this.state));
            }

           
        }
   
        
    }

//adds active selection indicator to dropdown item and stores length of travel
    toggleLengthClass(v){
        this.setState({
           activeLengthValue: v.value,
            lengthOfTravel: v.value, 
        lengthOfTravelID: v.name
       }, ()=> console.log(this.state))
    }


//dynamically generates destination dropdown options
    //replace placeholder text once selection has been made
    //new search button replaces destination dropdown once 'let's go!' has been selected and API call made
    //need to add form validation
    destinationsDropdown() {
        for (var i = 0; i <= destinations.length; i++) {
            return (
                <Col sm={12} lg={4}>
                    {this.state.disabled === true ? this.newSearch() :
                        <DropdownButton bsSize="large"
                            componentClass={InputGroup.Button}
                            id="input-dropdown-addon"
                            title={this.state.destination != '' ? `Traveling to ${this.state.destination}` : "Where do you want to go?"}
                        >
                            {destinations.map((item, index) => (<MenuItem key={index} className={this.state.activeIndex === index ? 'active' : null} onClick={this.toggleClass.bind(this, index)}>{item.city}</MenuItem>))}
                        </DropdownButton>}
                 </Col>
                )
        }
    }
//dynamically generates length of travel dropdown options
    //replace placeholder text once selection has been made
    //need to add form validation
    tripLengthDropdown() {
        for (var i = 0; i <= tripLength.length; i++) {
            return (
                <Col sm={12} lg={4}>
                    <DropdownButton bsSize="large"
                        componentClass={InputGroup.Button}
                        id="input-dropdown-addon"
                        title={this.state.lengthOfTravelID ? `Traveling for ${this.state.lengthOfTravelID}` : "How long do you want to explore?"}
                    
                >
                    {tripLength.map((item, index) => (<MenuItem key={index} value={item.value} className={this.state.activeLengthValue == item.value ? 'active' : null}  onClick={this.toggleLengthClass.bind(this, item)}>{item.name}</MenuItem>))}
                    </DropdownButton>
                 </Col>
                )
        }
    }
   



  //brings in react-datepicker component
//replace placeholder text once selection has been made
//need to add form validation
    datePicker() {
        let placeholder = this.state.leaveDate ? `Leaving on ${moment(this.state.leaveDate).format("MM/DD/YYYY")}` : "When do you want to take off?"
        return (
            <Col sm={12} lg={4}>
         
                <DatePicker onChange={this.handleChange} minDate={moment()} className="form-control calendarForm" placeholderText={placeholder} dateFormat="LLL"/>

            </Col>
            
            
            )
    }

//creates form for trip calculator
    createForm() {
        return (
            <StyledContainer className='container'>
            <Form inline id="calForm">
                <FormGroup  controlId="formInlineCalc" bsSize="large">
                   <InputGroup className="row">
                        {this.destinationsDropdown()}
                       {this.datePicker()}
                       {this.tripLengthDropdown()}
                     
                    </InputGroup>
                </FormGroup>
            </Form>
            </StyledContainer>

            
            )
    }

   //graps average cost per day from API call to calculate total cost of trip which is passed to helper functions to either calculate how much to save in time remaining till trip or by pay period if time remaining is greater than one week
    generateResults(){
        if(this.state.showResults === true){
            let dailyCost = parseInt(this.state.results.AverageDailyCost)
            let hotelCost = parseInt(this.state.results.AverageHotelCostNightly)
            let totalDailyCost = dailyCost + hotelCost   
            let totalTripCost = totalDailyCost * this.state.lengthOfTravel
            let ttcost = `$${totalTripCost}`
            return (
                <Row className="resultsRow well">
                    <Col lg={6} sm={12}>
                        <StyledH3>Our Estimate for your Adventure's Cost: </StyledH3><br />
                     <StyledH4 className="resultsItem">Average Daily for Travel in {this.state.destination}  : ${totalDailyCost}</StyledH4>   <br />
                        <StyledH4 className="resultsItem">You will need to save {ttcost} for your {this.state.lengthOfTravel} day trip.</StyledH4> <br />
                    
                </Col>
                <Col lg={6} sm={12}>
                {this.state.paySet ? this.savingsIncrement(totalTripCost) : this.payDropDowns(totalTripCost)}
                </Col>
              
                </Row>
        
               )
        } else {
            return <div> </div>
        }
       
            
    }

    //creates dropdown menu to select pay increment is time left before trip is greater than 6 days
    //if time left is less than 6 days indicates total amount left to 'save' in time remaining
    payDropDowns(totalTripCost){
        console.log('days till travel', this.state.daysTillTravel)
        if(this.state.daysTillTravel > 6){
            let payIncrements = ["Weekly", "Bi-Weekly", "Monthly"]
            for(var i = 0; i <= payIncrements.length; i++){
                return (
                    <FormGroup>
                    <DropdownButton bsSize="large"
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                            title={this.state.paySet ? this.state.paySet : "Select Your Paycheck Increment"}
                    className="resultsItem incrementBtn"
                >
                    
                  {payIncrements.map((item, index) =>(<MenuItem value={item} key={index} onClick={this.calculateSavingsPlan.bind(this, item)}>{item}</MenuItem>))}
                    </DropdownButton>
                    </FormGroup>
                )
            }
        } else{
            let daysTillTrip = this.state.daysTillTravel
            let amountPerDay = (totalTripCost / daysTillTrip) 
            return (
                <div>
                    <StyledH3>Here's the Game Plan: </StyledH3> <br />
                <StyledH4>You need to save ${Math.round(totalTripCost)} in the next {daysTillTrip} days!</StyledH4><br />
                    <MotivationalP>You got this!</MotivationalP>
                    </div>
            )
           
        }
       
    }
//sets pay increment in state which triggers 'Let's Go' button to hide and 'Fun Fact' to show
    calculateSavingsPlan(item){
        this.setState({
            paySet: item
            
        })
    }

  //calculates amount to save per pay increment (rounds to nearest integer)
    savingsIncrement(totalTripCost) {

        let daysTillTrip = this.state.daysTillTravel
        let payScheduleValue
        if(this.state.paySet === 'Weekly'){
            payScheduleValue = 7
        } else if (this.state.paySet === 'Bi-Weekly'){
             payScheduleValue = 15
        } else {
            payScheduleValue = 30
        }

        let amountPerDay = (totalTripCost/daysTillTrip) 
        console.log(amountPerDay)
        let payPeriods = daysTillTrip/parseInt(payScheduleValue)
        console.log(payPeriods)
        let amountToSave = (totalTripCost / payPeriods)
        console.log(amountToSave)
        console.log(this.state)
        return (
            <div>
                <StyledH3>Here's the Game Plan: </StyledH3> <br />
                <StyledH4>You have about {Math.round(payPeriods)} pay increments before your trip. <br />Let's save ${Math.round(amountToSave)} per paycheck starting on {moment(this.state.startDate).format("MM/DD/YYYY")}!</StyledH4><br />
                <MotivationalP>Way to plan ahead! You got this!</MotivationalP>
                </div>
        )
    }

//button to refresh state and allow new search
    newSearch() {
        return (
            <StyledButton2 className="btn btn-warning btn-lg"  onClick={this.NewSearchSelection.bind(this)}>New Search</StyledButton2>
            )
    }
//refreshes state
    NewSearchSelection() {
        console.log(this.state)
        this.setState({
            disabled: false,
            startDate: moment().toArray(),
            destination: '',
            lengthOfTravel: '',
            dateOfTravel: '',
            costPerDay: '', 
            daysTillTravel: 0,
            results: '',
            paySet: '', 
            showResults: false, 
            selection: '', 
            leaveDate: ''
            



        })
    }

    render() {
        //disables api button until all selections have been made
        let disabledButton
        if (this.state.destination == null || this.state.destination == '' || this.state.lengthOfTravel == null || this.state.lengthOfTravel == '' || this.state.leaveDate == null || this.state.leaveDate == '') {
            disabledButton = 'disabled'
        } else {
            disabledButton = ''
        }
        let showFact = this.state.showResults === true ? <SpacingDiv> <StyledAlert className="alert alert-warning" >
            <StyledHead>Fun fact!</StyledHead><br /><StyledP> {this.state.results.Fact}</StyledP>
        </StyledAlert></SpacingDiv> : <StyledButton className={` ${disabledButton} btn btn-warning btn-lg`} onClick={this.fetchTripCost}>Let's Go!</StyledButton>
        return (
            <Grid className="calcContainer">
            <Row>
            {this.createForm()}
            </Row>
            <Row>
                <Col sm={12} lg={12}>
                        {showFact}
                </Col>
                <Col sm={12} lg={12} className="resultsCol">
                
                        {this.generateResults()}
                    
                </Col>
            </Row>
            </Grid>
            
            )
    }
}

export default Calculator;