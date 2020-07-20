import React from 'react';
import { withFirebase } from '../../Firebase/index';
import SignIn from '../AuthenticationPage/SignIn/SignIn';
import SignOut from '../AuthenticationPage/SignOut/SignOut';

class AuthenticationPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.firebase.auth.currentUser) {
      return <SignOut />
    } else {
      return <SignIn />
    }
  }
}

export default withFirebase(AuthenticationPage);