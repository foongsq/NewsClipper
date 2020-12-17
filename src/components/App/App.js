import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Redirect} from 'react-router-dom';
import { withFirebase } from '../../Firebase/index';
import DatePicker from '../DatePicker/DatePicker';
import DatePage from '../DatePage/DatePage';
import CoatOfArms from '../../images/coat-of-arms.svg';
import Mike from '../../images/mike.jpg';
import SignIn from '../AuthenticationPage/SignIn/SignIn';
import SignOut from '../AuthenticationPage/SignOut/SignOut';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      authWasListened: false,
    }
    this.setAuthUser = this.setAuthUser.bind(this);
    this.setAuthWasListened = this.setAuthWasListened.bind(this);
    this.authListener = this.props.firebase.auth.onAuthStateChanged(
      (authUser) => {
        if(authUser) {
          this.setAuthUser(authUser);
          this.setAuthWasListened(true);
        } else {
          this.setAuthUser(null);
          this.setAuthWasListened(true);
        }
      }
    );
  }

  setAuthUser(user) {
    this.setState({ authUser: user });
  }

  setAuthWasListened(boolean) {
    this.setState({ authWasListened: boolean });
  }

  render() {
    return (
      <div className="app">
        <Router>
          <div className="top-panel">
            <img src={CoatOfArms} alt='' />
            <div className="title-date-tagline-div">
              <div className="title-div">
                <h1>N</h1><h2>EWS CLIPPER</h2>
              </div>
              <p>Life Writes Its Own Stories.</p>
              <DatePicker />
            </div>
            <div className="Profile">
              {this.state.authUser
                ? <SignOut imageSrc={this.props.firebase.auth.currentUser.photoURL} />
                : <SignIn imageSrc={Mike} />}
              {/* <img className="profile-pic" src={this.props.firebase.auth.currentUser 
                  ? this.props.firebase.auth.currentUser.photoURL 
                  : Mike} /> */}
            </div>
          </div>

          <div className="content">
            {/* {this.state.authWasListened ? <p>Authenticated! :)</p> : <p>Waiting for auth...</p>} */}
            <Route exact path="/"><Redirect to={`/${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`} /></Route>
            <Route path={`/:date`} component={DatePage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default withFirebase(App);
