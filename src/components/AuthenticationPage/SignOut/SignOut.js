import React from 'react';
import { withFirebase } from '../../../Firebase/index';
import { withRouter} from 'react-router-dom';
import { compose } from 'recompose';

class SignOut extends React.Component {
  constructor(props) {
    super(props);
    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  onSignOutClick() {
    return this.props.firebase.doSignOut().then(() => this.props.history.push('/'));
  }
  render() {
    console.log(this.props)
    return (
      <div className='container'>
        <button type="button" onClick={this.onSignOutClick}>
          <img className="image" src={this.props.imageSrc} />
          <div className="overlay">
            <p className="text">Sign Out</p>
          </div>
        </button>
      </div> 
      
        
        
    );
  }
}
 
export default compose(withFirebase, withRouter)(SignOut);