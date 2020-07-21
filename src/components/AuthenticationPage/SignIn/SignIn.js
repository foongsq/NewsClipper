import React from 'react'; 
import { withFirebase } from '../../../Firebase/index';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.onGoogleSubmit = this.onGoogleSubmit.bind(this);
    this.createUserInDatabase = this.createUserInDatabase.bind(this);
  }
 
  createUserInDatabase(snapshot, user) {
    console.log('snapshot.val', snapshot.val())
    console.log('user', user)
    if (snapshot.val() === null) {
      return this.props.firebase.database.ref().child('users').child(user.user.uid)
       .set({
         username: user.user.displayName,
         email: user.user.email,
         roles: {},
       }); 
    }
  }

  onGoogleSubmit(event) {
    this.props.firebase.doSignInWithGoogle()
      .then(socialAuthUser => {
        console.log('socialauthuser.uid', socialAuthUser.user.uid)
        return this.props.firebase.database.ref().child('users')
        .child(socialAuthUser.user.uid).once('value', snapshot => this.createUserInDatabase(snapshot, socialAuthUser));
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error)
        this.setState({ error });
      });
    event.preventDefault();
  };
 
  render() {
    console.log(this.props.firebase.auth.currentUser)
    const { error } = this.state;
    return (
      <div>
        <form onSubmit={this.onGoogleSubmit}>
        {this.props.imageSrc 
          ? <div className='container'>
              <button type="submit">
                <img className="image" src={this.props.imageSrc} />
                <div className="overlay">
                  <p className="text">Sign In with Google</p>
                </div>
              </button>
            </div> 
          : <button type="submit">
              <i className="fa fa-google"></i><p>Sign In with Google</p>
            </button>}
          
          {/* {error && <p>{error.message}</p>} */}
        </form>
      </div>
    );
  }
}

export default compose(withRouter, withFirebase,)(SignIn);