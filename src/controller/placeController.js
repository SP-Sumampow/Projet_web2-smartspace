'use strict';

const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate a Token from the "Tokens Tab" in the UI
const token = 'ioIPOw_PJ1pOp6LcFP7J1BCGnR63VCl4vKQSMu5FkZEvCFHFHmkT0qcQaYWz9sOJRa3HXJYPUQrmB3xzGDgMww=='
const org = 'heticproject-web2-smartspace'
const bucket = 'MQTT-smartspace'

const client = new InfluxDB({ url: 'http://34.132.95.151:8086', token: token })


const authMiddleware = require('../auth.middleware.js');
const firebase = require('../firebaseConfig');
const admin = require('firebase-admin');

let places = [];

const fakedata = {
  "places": [
    {
      "placeNumber": "1001",
      "placeValue": 0
    },
    {
      "placeNumber": "1002",
      "placeValue": 1
    },
    {
      "placeNumber": "1003",
      "placeValue": 1
    },
    {
      "placeNumber": "1004",
      "placeValue": 1
    },
    {
      "placeNumber": "1005",
      "placeValue": 1
    },
    {
      "placeNumber": "1006",
      "placeValue": 1
    },
    {
      "placeNumber": "2001",
      "placeValue": 0
    },
    {
      "placeNumber": "2002",
      "placeValue": 1
    },
    {
      "placeNumber": "2003",
      "placeValue": 0
    },
    {
      "placeNumber": "2004",
      "placeValue": 1
    },
    {
      "placeNumber": "3101",
      "placeValue": 0
    },
    {
      "placeNumber": "3102",
      "placeValue": 1
    },
    {
      "placeNumber": "3103",
      "placeValue": 0
    },
    {
      "placeNumber": "3104",
      "placeValue": 0
    },
    {
      "placeNumber": "3105",
      "placeValue": 1
    },
    {
      "placeNumber": "3201",
      "placeValue": 0
    },
    {
      "placeNumber": "3202",
      "placeValue": 0
    },
    {
      "placeNumber": "3203",
      "placeValue": 1
    },
    {
      "placeNumber": "3204",
      "placeValue": 0
    },
    {
      "placeNumber": "3301",
      "placeValue": 1
    },
    {
      "placeNumber": "3302",
      "placeValue": 1
    },
    {
      "placeNumber": "3303",
      "placeValue": 0
    },
    {
      "placeNumber": "3304",
      "placeValue": 0
    },
    {
      "placeNumber": "3401",
      "placeValue": 0
    },
    {
      "placeNumber": "3402",
      "placeValue": 0
    },
    {
      "placeNumber": "3403",
      "placeValue": 1
    },
    {
      "placeNumber": "3404",
      "placeValue": 1
    },
    {
      "placeNumber": "3501",
      "placeValue": 1
    },
    {
      "placeNumber": "3502",
      "placeValue": 1
    },
    {
      "placeNumber": "3503",
      "placeValue": 0
    },
    {
      "placeNumber": "4101",
      "placeValue": 0
    },
    {
      "placeNumber": "4102",
      "placeValue": 0
    },
    {
      "placeNumber": "4103",
      "placeValue": 0
    },
    {
      "placeNumber": "4104",
      "placeValue": 0
    },
    {
      "placeNumber": "4106",
      "placeValue": 0
    },
    {
      "placeNumber": "4201",
      "placeValue": 0
    },
    {
      "placeNumber": "4202",
      "placeValue": 0
    },
    {
      "placeNumber": "4203",
      "placeValue": 1
    },
    {
      "placeNumber": "4204",
      "placeValue": 1
    },
    {
      "placeNumber": "4301",
      "placeValue": 0
    },
    {
      "placeNumber": "4302",
      "placeValue": 1
    },
    {
      "placeNumber": "4303",
      "placeValue": 1
    },
    {
      "placeNumber": "4304",
      "placeValue": 1
    },
    {
      "placeNumber": "5101",
      "placeValue": 0
    },
    {
      "placeNumber": "5102",
      "placeValue": 1
    },
    {
      "placeNumber": "5103",
      "placeValue": 0
    },
    {
      "placeNumber": "5201",
      "placeValue": 0
    },
    {
      "placeNumber": "5202",
      "placeValue": 0
    },
    {
      "placeNumber": "5203",
      "placeValue": 0
    },
    {
      "placeNumber": "5204",
      "placeValue": 0
    },
    {
      "placeNumber": "5205",
      "placeValue": 0
    },
    {
      "placeNumber": "5206",
      "placeValue": 0
    },
    {
      "placeNumber": "5301",
      "placeValue": 0
    },
    {
      "placeNumber": "5302",
      "placeValue": 1
    },
    {
      "placeNumber": "5303",
      "placeValue": 1
    },
    {
      "placeNumber": "5304",
      "placeValue": 1
    },
    {
      "placeNumber": "5305",
      "placeValue": 0
    },
    {
      "placeNumber": "5306",
      "placeValue": 1
    },
    {
      "placeNumber": "5401",
      "placeValue": 0
    },
    {
      "placeNumber": "5402",
      "placeValue": 0
    },
    {
      "placeNumber": "5403",
      "placeValue": 0
    },
    {
      "placeNumber": "5404",
      "placeValue": 0
    },
    {
      "placeNumber": "5406",
      "placeValue": 0
    },
    {
      "placeNumber": "5501",
      "placeValue": 1
    },
    {
      "placeNumber": "5502",
      "placeValue": 0
    },
    {
      "placeNumber": "5505",
      "placeValue": 0
    },
    {
      "placeNumber": "5601",
      "placeValue": 1
    },
    {
      "placeNumber": "5602",
      "placeValue": 0
    },
    {
      "placeNumber": "5603",
      "placeValue": 1
    },
    {
      "placeNumber": "5604",
      "placeValue": 0
    },
    {
      "placeNumber": "5606",
      "placeValue": 1
    },
    {
      "placeNumber": "6101",
      "placeValue": 1
    },
    {
      "placeNumber": "6102",
      "placeValue": 1
    },
    {
      "placeNumber": "6103",
      "placeValue": 1
    },
    {
      "placeNumber": "6201",
      "placeValue": 1
    },
    {
      "placeNumber": "6301",
      "placeValue": 1
    },
    {
      "placeNumber": "6302",
      "placeValue": 0
    },
    {
      "placeNumber": "6303",
      "placeValue": 0
    },
    {
      "placeNumber": "6304",
      "placeValue": 1
    },
    {
      "placeNumber": "6401",
      "placeValue": 1
    },
    {
      "placeNumber": "6402",
      "placeValue": 0
    },
    {
      "placeNumber": "6403",
      "placeValue": 0
    },
    {
      "placeNumber": "6404",
      "placeValue": 1
    }
  ]
}

const getFakePlaces = (req, res) => {
  res.status(200).json(fakedata);
}

  const getPlaces = (req, res) => {

  const queryApi = client.getQueryApi(org);
  const query = `from(bucket: "${bucket}") |> range(start: -1h)`

  queryApi.queryRows(query, {
    next(row, tableMeta) {


      const rowData = tableMeta.toObject(row)
      const field = rowData["_field"]
      console.log(rowData)

      //console.log(rowData)

      if (field == "data_value") {

        const placeNumber = rowData["nodeID"];
        const placeValue = rowData["_value"];

        places.push({
          placeNumber,
          placeValue
        });
      }
    },
    error(error) {
      console.error(error)
      console.log('nFinished ERROR')
    },
    complete() {
      console.log('nFinished SUCCESS')
      res.status(200).json({ places });
    },
  })


  //res.status(200).json({ "todo": [{ "title":"newTodo"}]});
}

module.exports = {
  getPlaces,
  getFakePlaces
};


// `from(bucket: "MQTT-smartspace")
//   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
//   |> filter(fn: (r) => r["_measurement"] == "Presence")
//   |> filter(fn: (r) => r["_field"] == "data_value")
//   |> filter(fn: (r) => r["nodeID"] == "1006" or r["nodeID"] == "1001" or r["nodeID"] == "1002" or r["nodeID"] == "1003" or r["nodeID"] == "1004" or r["nodeID"] == "1005" or r["nodeID"] == "2001")
//   |> filter(fn: (r) => r["topic"] == "WEB2-SMARTSPACE/1006/128" or r["topic"] == "WEB2-SMARTSPACE/1001/128" or r["topic"] == "WEB2-SMARTSPACE/1002/128" or r["topic"] == "WEB2-SMARTSPACE/1003/128" or r["topic"] == "WEB2-SMARTSPACE/1004/128" or r["topic"] == "WEB2-SMARTSPACE/1005/128" or r["topic"] == "WEB2-SMARTSPACE/2001/128")
//   |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
//   |> yield(name: "mean")`
