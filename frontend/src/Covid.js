import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Covid extends Component {
    constructor() {
        super();
        this.state = {
            usState: "Alaska",
            hospitalized: "five",
            death: "two"
        }
    }

    componentDidMount = () => {
        axios.get("/current").then(response => {
            const hospitalizedCurrently = response.data[0].hospitalized;
            const usState = response.data[0].usState;
            console.log("DATA hospitalized: ", hospitalizedCurrently, "DATA state: ", usState);
            console.log("PATH (current): ", response);
            // this.setState({
            //     usState: response.data.state
            // })

        });
        axios.get("/death").then(response => {
            const death = response.data[0].death;
            const usState = response.data[0].usState;
            console.log("DATA number: ", death, "DATA state: ", usState);
            console.log("PATH (death): ", response);
            


        });
    }

    render() {
        return (
            <div>
                <h1 className="header-title"><span className="header-title-main">Covid-19:</span> Current hospitilized in US states </h1>
                <Button>Get more info</Button>
                <p>{this.state.usState} have___ {this.state.hospitilized} patients currently hospitilized.</p>
            </div>
        );
    }
}

export default Covid;