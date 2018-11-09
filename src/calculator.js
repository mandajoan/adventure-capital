import React, { Component } from 'react';
import { FormGroup, Form, DropdownButton, MenuItem, InputGroup, Col, Grid, Row, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";


const StyledButton = styled.button`
margin-top: 40px;
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
width: 60%;
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



const destinations = [{ "city": "Paris", "country": "France", "geonameId": 2988507 }, { "city": "Bangkok", "country": "Thailand", "geonameId": 1609350 }, { "city": "New York", "country": "United States", "geonameId": 5128581 }, { "city": "Bali", "country": "Indonesia", "geonameId": 1650535 }, { "city": "Istanbul", "country": "Turkey", "geonameId": 745044 }, { "city": "Lima", "country": "Peru", "geonameId": 3936456}]
const tripLength = [{"name": "2 days", "value": 2}, {"name": "1 Week", "value": 7}, {"name": "2 weeks", "value": 14}, {"name": "3 weeks", "value": 21}, {"name": "1 month", "value": 30} ]
class Calculator extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        //this.toggleClass = this.toggleClass.bind(this)
        this.fetchTripCost = this.fetchTripCost.bind(this)
       // this.calculateSavingsPlan = this.calculateSavingsPlan.bind(this)
        this.state = {
            startDate: moment().toArray(),
            destination: '', 
            lengthOfTravel: '',
            dateOfTravel: '', 
            costPerDay:'', 
            activeIndex: 0, 
            activeLengthIndex: 0
        }
        
    }

    handleChange(date) {
        
        this.setState({
            leaveDate: date.toArray(), 
            selection: true
        }, () => this.calculateDateDifference())
     
    }

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

    fetchTripCost(){
        console.log(this.state.destination)
        let URL = `https://adventure-capital-backend.herokuapp.com/location/${this.state.destination}`
        axios.get(URL, {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': "application/json"}})
        .then(response => {
            let tripCostResults = response.data
            this.setState({
                showResults: true, 
                results: tripCostResults
            })
            
        })
    }

    componentDidMount(){
        //this.fetchTripCost()
    }

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
    toggleLengthClass(v){
       this.setState({
        lengthOfTravel: v
       }, ()=> console.log(this.state))
    }



    destinationsDropdown() {
        for (var i = 0; i <= destinations.length; i++) {
            return (
                <Col sm={12} lg={4}>
                    <DropdownButton bsSize="large"
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title="Where do you want to go?"
                >
                    {destinations.map((item, index) => (<MenuItem key={index} className={this.state.activeIndex === index ? 'active' : null} onClick={this.toggleClass.bind(this, index)}>{item.city}</MenuItem>))}
                    </DropdownButton>
                 </Col>
                )
        }
    }
    tripLengthDropdown() {
        for (var i = 0; i <= tripLength.length; i++) {
            return (
                <Col sm={12} lg={4}>
                    <DropdownButton bsSize="large"
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title="How long do you want to explore?"
                    
                >
                    {tripLength.map((item, index) => (<MenuItem key={index} value={item.value} className={this.state.activeLengthIndex == index ? 'active' : null} onClick={this.toggleLengthClass.bind(this, item.value)}>{item.name}</MenuItem>))}
                    </DropdownButton>
                 </Col>
                )
        }
    }
   



  //  <div class="react-datepicker-wrapper"><div class="react-datepicker__input-container"><input type="text" value="11/23/2018" class=""></div></div>

    datePicker() {
       
        return (
            <Col sm={12} lg={4}>
         
                <DatePicker onChange={this.handleChange} className="form-control calendarForm" placeholderText="When do you want to take off?" dateFormat="LLL"/>

            </Col>
            
            
            )
    }


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
    generateResults(){
      
        if(this.state.showResults === true){
            let dailyCost = parseInt(this.state.results.AverageDailyCost)
            let hotelCost = parseInt(this.state.results.AverageHotelCostNightly)
            console.log(dailyCost)
            console.log(hotelCost)
            let totalDailyCost = dailyCost + hotelCost
            console.log(totalDailyCost)
            let totalTripCost = totalDailyCost * this.state.lengthOfTravel
            let ttcost = `$${totalTripCost}`
            console.log(ttcost)
            return (
                <Row className="resultsRow well">
                <Col lg={6} sm={12}>
                     <StyledH4 className="resultsItem">Average Daily for Travel in {this.state.destination}  : ${totalDailyCost}</StyledH4>   <br />
                     <StyledH4 className="resultsItem">You will need to save {ttcost} </StyledH4> <br />
                    
                </Col>
                <Col lg={6} sm={12}>
                {this.state.paySet ? this.savingsIncrement(totalTripCost) : this.payDropDowns()}
                </Col>
              
                </Row>
        
               )
        } else {
            return <div> </div>
        }
       
            
    }
  
    payDropDowns(){
        console.log('days till travel', this.state.daysTillTravel)
        if(this.state.daysTillTravel > 6){
            let payIncrements = ["Weekly", "Bi-Weekly", "Monthly"]
            for(var i = 0; i <= payIncrements.length; i++){
                return (
                    <FormGroup>
                    <DropdownButton bsSize="large"
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title="Select Your Paycheck Increment"
                    className="resultsItem"
                >
                    
                  {payIncrements.map((item, index) =>(<MenuItem value={item} key={index} onClick={this.calculateSavingsPlan.bind(this, item)}>{item}</MenuItem>))}
                    </DropdownButton>
                    </FormGroup>
                )
            }
        } else{

            console.log('else')
        }
       
    }

    calculateSavingsPlan(item){
        this.setState({
            paySet: item
        })
    }
    savingsIncrement(totalTripCost){
        console.log(this.state.paySet)
        let daysTillTrip = this.state.daysTillTravel
        let payScheduleValue
        if(this.state.paySet === 'Weekly'){
            payScheduleValue = 7
        } else if (this.state.paySet === 'Bi-Weekly'){
             payScheduleValue = 15
        } else {
            payScheduleValue = 30
        }
        console.log('days till trip', daysTillTrip)
        let amountPerDay = (totalTripCost/daysTillTrip) 
        console.log('amount per day', amountPerDay)
        console.log('pay schedule value', payScheduleValue)
        let payPeriods = daysTillTrip/parseInt(payScheduleValue)
        console.log('payPeriods', payPeriods)
        let amountToSave = (totalTripCost/payPeriods)
        console.log('amount to save per pay period', amountToSave)
        return(
            <StyledH4>{amountToSave}</StyledH4>
        )
    }




    render() {
        let showFact = this.state.showResults === true ? <SpacingDiv> <StyledAlert className="alert alert-warning" >
            <StyledHead>Fun fact!</StyledHead><br /><StyledP> {this.state.results.Fact}</StyledP>
        </StyledAlert></SpacingDiv> : <StyledButton className="btn btn-warning btn-lg" onClick={this.fetchTripCost}>Let's Go!</StyledButton>
        return (
            <Grid>
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