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
  getPlaces
};


// `from(bucket: "MQTT-smartspace")
//   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
//   |> filter(fn: (r) => r["_measurement"] == "Presence")
//   |> filter(fn: (r) => r["_field"] == "data_value")
//   |> filter(fn: (r) => r["nodeID"] == "1006" or r["nodeID"] == "1001" or r["nodeID"] == "1002" or r["nodeID"] == "1003" or r["nodeID"] == "1004" or r["nodeID"] == "1005" or r["nodeID"] == "2001")
//   |> filter(fn: (r) => r["topic"] == "WEB2-SMARTSPACE/1006/128" or r["topic"] == "WEB2-SMARTSPACE/1001/128" or r["topic"] == "WEB2-SMARTSPACE/1002/128" or r["topic"] == "WEB2-SMARTSPACE/1003/128" or r["topic"] == "WEB2-SMARTSPACE/1004/128" or r["topic"] == "WEB2-SMARTSPACE/1005/128" or r["topic"] == "WEB2-SMARTSPACE/2001/128")
//   |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
//   |> yield(name: "mean")`
