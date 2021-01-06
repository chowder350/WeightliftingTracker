
import './App.css';
import PickWorkoutComponent from './Components/PickWorkoutComponent'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={PickWorkoutComponent}/>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
