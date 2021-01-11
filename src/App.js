
import './App.css';
import React from 'react';
import PickWorkoutComponent from './Components/PickWorkoutComponent'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProgressionDashboard from './Components/ProgressionDashboard';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router basename="/">
          <Switch>
            <Route exact path="/" component={PickWorkoutComponent}/>
            <Route exact path="/progression" component={ProgressionDashboard}/>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
