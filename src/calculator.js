import React, { Component } from 'react';
import { FormGroup, Form, DropdownButton, MenuItem, InputGroup, Col, Grid, Row, Button} from 'react-bootstrap';
import axios from 'axios';

import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";



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
            <Grid>
            <Form inline id="calForm">
                <FormGroup  controlId="formInlineCalc" bsSize="large">
                        <InputGroup className="row">
                        {this.destinationsDropdown()}
                            {this.datePicker()}
                       {this.tripLengthDropdown()}
                     
                    </InputGroup>
                </FormGroup>
                </Form>
                </Grid>

            
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
                <Row className="resultsRow">
                <Col lg={6} sm={12}>
                     <h4 className="resultsItem">Average Daily for Travel in {this.state.destination}  : ${totalDailyCost}</h4>   <br />
                     <h4 className="resultsItem">You will need to save {ttcost} </h4> <br />
                    
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
            let payIncrements = ["Weekly", "Bi-Monthly", "Monthly"]
            for(var i = 0; i <= payIncrements.length; i++){
                return (
                    <DropdownButton bsSize="large"
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title="How long do you want to explore?"
                    className="resultsItem"
                >
                    
                  {payIncrements.map((item, index) =>(<MenuItem value={item} key={index} onClick={this.calculateSavingsPlan.bind(this, item)}>{item}</MenuItem>))}
                    </DropdownButton>
                    
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
        console.log(totalTripCost)
        let daysTillTrip = this.state.daysTillTravel
        let payScheduleValue
        if(totalTripCost === 'Weekly'){
            payScheduleValue = 7
        } else if (totalTripCost === 'Bi-Weekly'){
             payScheduleValue = 14
        } else {
            payScheduleValue = 30
        }
        console.log('days till trip', daysTillTrip)
        let amountPerDay = (totalTripCost/daysTillTrip) 
        console.log('amount per day', amountPerDay)
        console.log('pay schedule value', payScheduleValue)
        let payPeriods = daysTillTrip/parseInt(payScheduleValue)
        console.log('payPeriods', payPeriods)
        let amountToSave = parseInt(amountPerDay) * payPeriods
        console.log(amountToSave)
        return(
            <h4>{amountToSave}</h4>
        )
    }


    render() {
        return (
            <Grid>
            <Row>
            {this.createForm()}
            </Row>
            <Row>
                <Col sm={12} lg={12}>
                <Button bsSize="large" bsStyle="warning" onClick={this.fetchTripCost}>Plan Your Trip!</Button>
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