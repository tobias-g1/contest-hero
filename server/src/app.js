// Imports

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const contests = require('./routes/contests.route.js');
const entries = require('./routes/entries.route');
const helmet = require('helmet')
const app = express()

// Require env

require('dotenv').config();

// initialize middleware

app.use(helmet())
app.use(helmet.frameguard({ action: 'sameorigin' }))
app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"] } }))
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Routes

app.use('/contests', contests);
app.use('/entries', entries);

// Start Listening

var listener = app.listen(process.env.PORT || 8081, function(){
  console.log('Listening on port ' + listener.address().port);
});


// Initialise MongoDB

require('./utils/db');





