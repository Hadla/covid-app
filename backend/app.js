const express = require('express');
const fetch = require('node-fetch')
const moment = require('moment');

const app = express();
const port = 5000;


// Currently hospitalized per US state
app.get('/current', async function (req, res) {
    try {
        const currentResponse = await fetch('https://covidtracking.com/api/v1/states.json')
        const currentData = await currentResponse.json();

        const currentResult = currentData.map((element) => {
            return {
                usState: element.state,
                hospitalized: element.hospitalizedCurrently
            }
        });

        const result = [...currentResult]

        console.log('result', result)
        res.json(result)
    } catch (error) {
        console.log(error.message)
    }
})

// Daily death per US state
app.get('/death', async function (req, res) {
    try {
        fetch('https://covidtracking.com/api/v1/states/daily.json')
            .then(res => res.json())
            .then(data => {
                
                const threeDaysAgo = moment().subtract(3, "day").format('YYYYMMDD');
                console.log('THE DATE 3 DAYS AGO: ', threeDaysAgo);
                
                let dateFiltered = data.filter((el) => el.date > threeDaysAgo)
                let states = [];
                for (let i = 0; i < dateFiltered.length; i++) {
                    if (!states.includes(dateFiltered[i].state)) {
                        states.push(dateFiltered[i].state);
                    }
                }
                let result = states.map(element => {
                    let thisStateData = dateFiltered.filter(dateNumbers => element === dateNumbers.state);
                    return {
                        usState: element,
                        totalDeaths: thisStateData.map(items => items.deathIncrease)
                            .reduce((prev, curr) => prev + curr, 0)
                    }
                })
                console.log(result)
                res.json(result)
            })
    } catch (error) {
        console.log(error.message)
    }
});

app.listen(port, () => console.log(`Covid app listening at http://localhost:${port}`));

