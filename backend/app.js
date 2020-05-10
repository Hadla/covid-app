const express = require('express');
const fetch = require('node-fetch')
const app = express();
const port = 5000;



app.get('/current', async function (req, res) {
    try {
        const currentResponse = await fetch('https://covidtracking.com/api/v1/states.json')
        const currentData = await currentResponse.json();
        const deathResponse = await fetch('https://covidtracking.com/api/v1/states/daily.json')
        const deathData = await deathResponse.json();

        // Currently hospitalized per US state
        const currentResult = currentData.map((element) => {
            return {
                usState: element.state,
                hospitalized: element.hospitalizedCurrently
            }
        });
        // Daily death per US state
        const deathResult = deathData.map((element) => {
            return {
                death: element.death
            }
        });

        const result = [...currentResult, deathResult]

        console.log('result', result)
        res.json(result)
    } catch (error) {
        console.log(error.message)
    }
})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

