import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { withFirebase } from '../../Firebase/index';
import DatePicker from '../DatePicker/DatePicker';
import DatePage from '../DatePage/DatePage';



class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Router>
          <div className="top-panel">
            <h1>News Clipper</h1>

          </div>
          <div className="content">
          <DatePicker />
          <Route exact path="/"><Redirect to={`/${new Date().toLocaleDateString().replace(/\//g, "-")}`} component={DatePage} /></Route>
          <Route path={`/:date`} component={DatePage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default withFirebase(App);
