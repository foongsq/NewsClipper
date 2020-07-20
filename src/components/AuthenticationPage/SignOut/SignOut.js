import React from 'react';
import { withFirebase } from '../../../Firebase/index';
import { useHistory } from 'react-router-dom';

function SignOutButton({ firebase }){
  const history = useHistory();
  return (
  <button type="button" onClick={() => firebase.doSignOut().then(() => history.push('/'))}>
    <i className="fa fa-sign-out" aria-hidden="true"></i>
    Sign Out
  </button>
);
  }
 
export default withFirebase(SignOutButton);