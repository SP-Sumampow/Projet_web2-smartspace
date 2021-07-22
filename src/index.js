/* eslint-disable max-len */
'use strict';
const express = require('express');
const router = require('./router');
const cookieParser = require("cookie-parser");
const cors = require('cors');

// Constants
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());

app.use(cookieParser());

app.use(express.urlencoded({extended: true}));
router.init(app);


app.listen(PORT, () => {
  console.log('API smartspace listening on port', PORT);
});