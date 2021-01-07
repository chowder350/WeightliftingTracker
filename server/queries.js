require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  ssl: true
})

console.log(pool);
//GET METHODS
  const getLiftData = (request, response) => {
    pool.query('SELECT wll.workoutliftlogid, wll.workoutid,' 
		+'wll.liftid, wll.sets, wll.reps, wll.weight, wll.notes, wll.date,'
		+'w.title, l.lifttitle '
    +'FROM workoutliftlog wll '
    +'INNER JOIN workouts w ON wll.workoutid = w.workoutid '
    +'INNER JOIN lift l ON l.liftid = wll.liftid '
    +'WHERE w.userid = 1;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getWorkouts = (request, response) => {
    pool.query('SELECT * FROM workouts WHERE userid = 1', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//PUT METHODS


const updateWorkoutLiftLog = async (request, response) => {
    // note: we don't try/catch this because if connecting throws an exception
    // we don't need to dispose of the client (it will be undefined)
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const insertIntoHistoryTableText = 'INSERT INTO workoutliftlog_history SELECT * FROM workoutliftlog WHERE workoutliftlogid = $1';
      const res = await client.query(insertIntoHistoryTableText, [request.body.WorkoutLiftLogID]);
      const updateWorkoutLiftLogText = 'UPDATE workoutliftlog SET sets = $1, reps = $2, weight = $3, notes = $4, date = $5 WHERE workoutliftlogid = $6';
      const updatedWorkoutLiftLogValues = [request.body.Sets,  request.body.Reps,  request.body.Weight, request.body.Notes, request.body.Date , request.body.WorkoutLiftLogID];
      await client.query(updateWorkoutLiftLogText, updatedWorkoutLiftLogValues)
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
    return response.json("success");
  }





  module.exports = {
    getLiftData,
    getWorkouts,
    updateWorkoutLiftLog
  }