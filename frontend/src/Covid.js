import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Covid extends Component {
    constructor() {
        super();
        this.state = {
            usState: "Alaska",
            hospitalizedCurrently: "five",
            totalDeaths: "two",
            covidData: []
        }
    }

    componentDidMount = () => {
        this.getCovidData()

    }

    getCovidData() {
        return axios.get("/current")
            .then(body => {
                console.log(body);
                this.setState({
                    ...this.state,
                    covidData: body.data
                })
            })
    }
    covidDataElements() {
        console.log(this.state.covidData);
        return (
        <TableContainer component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >State</TableCell>
            <TableCell align="left">Hospitalized</TableCell>
            <TableCell align="left">Death</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.covidData.map((row) => (
            <TableRow key={row.name}>
              
              <TableCell align="left">{row.usState}</TableCell>
              <TableCell align="left">{row.hospitalized || 'No data'}</TableCell>
              <TableCell align="left">{'Placeholder' || 'No data'}</TableCell>
 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)
       
    }

    render() {

        return (
            <div>
                <h1 className="header-title"><span className="header-title-main">Covid-19:</span> Current hospitilized in US states </h1>
                <Button>Get more info</Button>
                {this.covidDataElements()}
            </div >
        );
    }
}

export default Covid;



// this.setState({
//     usState: response.data[0].usState,
//     hospitalizedCurrently: response.data[0].hospitalized
// })


//  for (let i = 0; i < response.data.length; i++) {

// const hospitalizedCurrently2 = response.data[i].hospitalized;
// const usState2 = response.data[0].usState;
// console.log("hospitalized222: ", hospitalizedCurrently2, "state222: ", usState2);

// // axios.get("/death").then(response => {
// //     const death = response.data[0].totalDeaths;
// //     const usState = response.data[0].usState;
// //     console.log("DATA number: ", death, "DATA state: ", usState);
// //     console.log("PATH (death): ", response);



// // });