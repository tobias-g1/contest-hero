const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const secure = require('express-force-https')

// create the express app
const app = express()

// create middleware to handle the serving the app
app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.use(secure)

// Create default port to serve the app on
const port = process.env.PORT || 5000
app.listen(port)

// Log a feedback that this is actually running
console.log('Server started on port ' + port)
