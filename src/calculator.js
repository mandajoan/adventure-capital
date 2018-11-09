import React, { Component } from 'react';
import { FormGroup, Form, DropdownButton, MenuItem, InputGroup, Col, Grid} from 'react-bootstrap';
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

        console.log(days)
    }
    fetchTripCost(){
        let URL = 'https://adventure-capital-backend.herokuapp.com/location/Paris'
        axios.get(URL, {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': "application/json"}})
        .then(response => {
            console.log(response)
        })
    }
    componentDidMount(){
        this.fetchTripCost()
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
       console.log(v)
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

    render() {
        return (
            <div>
            {this.createForm()}
            </div>
            
            )
    }
}

export default Calculator;