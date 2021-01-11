require('dotenv').config()
var express = require('express');
var app = express();
var path = require("path");
const bodyParser = require('body-parser')
const db = require('./queries');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


// Serve static files from the React app
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

// // PATH CONFIGURATION TO RESPOND TO A REQUEST TO STATIC ROUTE REQUEST BY SERVING index.html
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });



//GET REQUESTS
app.get('/api/liftdata', db.getLiftData);

app.get('/api/workouts', db.getWorkouts);

app.get('/api/historicallog', db.getHistoricalLog);

app.get('/api/numberoflifts', db.getNumberOfLifts);

// //PUT REQUESTS
app.put("/api/workoutliftlog", db.updateWorkoutLiftLog)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    });