const express = require('express');
var request = require('request');
const app = express();
const port = 5000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/current', (req, res) => {
    request('https://covidtracking.com/api/v1/states/current.json', 
    function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
    });
});






// app.get('/current', async function (req, res) {
//     try {
//       //Fetch API
//       // const data = await fetch('https://coronavirus-tracker-api.herokuapp.com/confirmed');
//       // const dataJSON = await data.json()
//       // console.log(dataJSON)
//       //   res.json(dataJSON);
//       const confirmedResponse = await fetch('https://coronavirus-tracker-api.herokuapp.com/confirmed')
//       const confirmedData = await confirmedResponse.json();
//       const confirmedDatesResponse = await fetch('https://coronavirus-tracker-api.herokuapp.com/confirmed')
//       const confirmedDatesData = await confirmedDatesResponse.json();
//       const deathResponse = await fetch('https://coronavirus-tracker-api.herokuapp.com/deaths')
//       const deathData = await deathResponse.json();
//       const recoveredResponse = await fetch('https://coronavirus-tracker-api.herokuapp.com/recovered')
//       const recoveredData = await recoveredResponse.json();

//       const deathResult = deathData.locations.map(location => {
//         return {
//           deaths: location.latest,
//           dates: location.history
//         }
//       })  
//       const recoveredResult = recoveredData.locations.map(location => {
//         return {
//           recovered: location.latest,
//         }
//       })
//       const confirmedResult = confirmedData.locations.map((location, index) => {
//         return {
//           country: location.country,
//           confirmed: location.latest,
//           deaths: deathResult[index].deaths,
//           recovered: recoveredResult[index].recovered,


//         }
//       })

//       const result = [...confirmedResult, deathResult, recoveredResult]

//       console.log('result', result)
//       res.json(result)
//     } catch (error) {
//       console.log(error.message)
//     }
//   })




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

