const express = require('express');
const fetch = require('node-fetch')
const app = express();
const port = 5000;



app.get('/', async function (req, res) {
    try {
      const currentResponse = await fetch('https://covidtracking.com/api/v1/states.json')
      const currentData = await currentResponse.json();
      

      const currentResult = currentData.map((element) => {
        return {
            state: element.state,
            hospitalizedCurrently: element.hospitalizedCurrently
        }
      })

      const result = [...currentResult]

      console.log('result', result)
      res.json(result)
    } catch (error) {
      console.log(error.message)
    }
  })




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

