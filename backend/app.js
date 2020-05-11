const express = require('express');
const fetch = require('node-fetch')
const app = express();
const port = 5000;



app.get('/current', async function (req, res) {
    try {
        const currentResponse = await fetch('https://covidtracking.com/api/v1/states.json')
        const currentData = await currentResponse.json();

        // Currently hospitalized per US state
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
                let dateFiltered = data.filter((el) => el.date > 20200507)
                let states = [];
                for (let i = 0; i < dateFiltered.length; i++) {
                    if (!states.includes(dateFiltered[i].state)) {
                        states.push(dateFiltered[i].state);
                    }
                }
                let result = states.map(shortName => {
                    let thisStateData = dateFiltered.filter(dateNumbers => shortName === dateNumbers.state);
                    return {
                        state: shortName,
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




// app.get('/death', async function (req, res) {
//     try {

//         const deathResponse = await fetch('https://covidtracking.com/api/v1/states/daily.json')
//         const deathData = await deathResponse.json();

//         const deathResult = deathData.map((element) => {
//             return {
//                 usState: element.state,
//                 death: element.deathIncrease
//             }
//         });

//         const result = [...deathResult]

//         console.log('result', result)
//         res.json(result)
//     } catch (error) {
//         console.log(error.message)
//     }
// })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

