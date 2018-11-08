import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock, Form, DropdownButton, MenuItem, InputGroup, Col} from 'react-bootstrap';
import axios from 'axios';

const destinations = [{ "city": "Paris", "country": "France", "geonameId": 2988507 }, { "city": "Bangkok", "country": "Thailand", "geonameId": 1609350 }, { "city": "New York", "country": "United States", "geonameId": 5128581 }, { "city": "Bali", "country": "Indonesia", "geonameId": 1650535 }, { "city": "Istanbul", "country": "Turkey", "geonameId": 745044 }, { "city": "Lima", "country": "Peru", "geonameId": 3936456}]

class Calculator extends Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this)
        this.state = {
            destination: '', 
            lengthOfTravel: '',
            dateOfTravel: '', 
            costPerDay:''
        }
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
    destinationsDropdown() {
        for (var i = 0; i <= destinations.length; i++) {
            return (
               
                <DropdownButton
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title="Where do you want to go?"
                >
                    {destinations.map((item, index) => (<MenuItem key={index}>{item.city}</MenuItem>))}
                    </DropdownButton>
                 
                )
        }
    }


    createForm() {
        return (
            <Form inline id="calForm">
                <FormGroup controlId="formInlineCalc" bsSize="large">
                  <InputGroup bsSize="large">
                        {this.destinationsDropdown()}
                       
                        <DropdownButton
                            componentClass={InputGroup.Button}
                            id="input-dropdown-addon"
                            title="When are you going?"
                        >
                            <MenuItem key="1">Item</MenuItem>
                        </DropdownButton>
                        <DropdownButton
                            componentClass={InputGroup.Button}
                            id="input-dropdown-addon"
                            title="How long are you traveling?"
                        >
                            <MenuItem key="1">Item</MenuItem>
                        </DropdownButton>
                    </InputGroup>
                </FormGroup>
            </Form>

            
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