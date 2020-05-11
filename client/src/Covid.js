import React, { Component } from 'react';
import axios from 'axios';
import { states } from './usStates';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';




class Covid extends Component {


    constructor() {
        super();
        this.state = {
            covidData: []
        }
    }

    componentDidMount = () => {
        this.getCovidData()
    }

    async getCovidData() {
        try {
            let deathData = await axios.get("/death");
            let currentData = await axios.get("/current");
            let finalData = currentData.data.map(currentElement => {
                let death = deathData.data.find(deathElement =>
                    currentElement.usState === deathElement.usState
                )
                return { ...currentElement, death: death.totalDeaths }
            })
            this.setState({
                ...this.state,
                covidData: finalData
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    covidDataElements() {

        console.log(this.state.covidData);
        return (
            <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: "800"}} >State</TableCell>
                            <TableCell className="hospitalized" align="left">Hospitalized</TableCell>
                            <TableCell style={{fontWeight: "400"}} align="left">Total new corona deaths during the last 3 days"</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.covidData.map((row, index) => (
                            <TableRow key={'covidRow' + index}>

                                <TableCell style={{fontWeight: "800"}} className="stateData" align="left">{states[row.usState]}</TableCell>
                                <TableCell className="hospitalizedData"align="left">{row.hospitalized || 'No data'}</TableCell>
                                <TableCell className="deathData"align="left">{row.death || 'No data'}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>)
    }

    render() {

        return (
            <div>
                <h1 style={{fontWeight: "300", marginBottom:"0"}}><span style={{fontWeight: "500"}} >Covid-19:</span> Live Corona statistics of the U.S</h1>
                <p align="left" style={{ fontSize:"0.7rem", fontWeight:"300", fontStyle:"italic", marginTop:"0", marginBottom:"1rem", marginLeft:"0.5rem"}}><span style={{fontWeight:"500"}}>No Data:</span> This means that the state has not yet given any updated information yet.</p>
                {this.covidDataElements()}
            </div >
        );
    }
}

export default Covid;