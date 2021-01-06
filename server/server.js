require('dotenv').config()
var express = require('express');
var app = express();
var sql = require("mssql");
var path = require("path");
const PORT = process.env.PORT || 5000;
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

  // config for your database
  var config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    //port: process.env.PORT
};
console.log(config);
//GET REQUESTS
app.get('/api/liftdata', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        request.input('UserID', sql.Int, 1);
           
        // query to the database and get the records
        request.execute('dbo.usp_GetWorkoutAndLiftLogData', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            console.log(recordset);
            
        });
    });
});

app.get('/api/workouts', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * FROM Workouts WHERE UserID = 1;', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            console.log(recordset);
            
        });
    });
});

//PUT REQUESTS
app.put('/api/workoutliftlog', function (req, res) {
    console.log(req.body)
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        request.input('WorkoutLiftLogID',sql.Int,req.body.WorkoutLiftLogID);
        request.input('Sets',sql.Int,  req.body.Sets);
        request.input('Reps', sql.Int, req.body.Reps);
        request.input('Weight', sql.Decimal, req.body.Weight);
        request.input('Notes', sql.NVarChar(sql.MAX), req.body.Notes);
        request.input('Date', sql.DateTime, req.body.Date);

       
           
        // query to the database and get the records
        request.execute('dbo.usp_UpdateWorkoutLiftLog', function (err, response) {
            
            if (err){
                console.log(err)
                res.send("Fail")
            } 

            // send records as a response
            res.send(response);
            console.log(response);

            
        });
    });
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/*', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    });