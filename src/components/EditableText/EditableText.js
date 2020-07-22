import React from 'react';
import './EditableText.css';
import { withFirebase } from '../../Firebase/index';

class EditableText extends React.Component {
  constructor(props) {
    super(props);
    this.ESCAPE_KEY = 27;
    this.ENTER_KEY = 13;
    this.state = {
      editText: this.props.content,
      editing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEditButtonClick() {
    if (this.state.editing) {
      this.handleSubmit();
    } else {
      this.setState({
        editing: true,
      });
    }
  }  
  
  handleChange (e) {
    this.setState({ editText: e.target.value });
  }
  
  handleSubmit () {
    let val = this.state.editText;
    if (this.props.type === "title") { //update title
      this.props.firebase.database.ref('users')
        .child(this.props.firebase.auth.currentUser.uid)
        .child("newsclippings")
        .child(this.props.date)
        .child(this.props.id)
        .update({
          title: val,
        });
    } else { //update summary
      this.props.firebase.database.ref('users')
        .child(this.props.firebase.auth.currentUser.uid)
        .child("newsclippings")
        .child(this.props.date)
        .child(this.props.id)
        .update({
          summary: val,
        });
    }
   
	  if (val) {
		  this.setState({
        editText: val,
        editing: false,
      });
	  } 
	}
  
  handleKeyDown (e) {
    console.log('e.which', e.which)
    if (e.which === this.ESCAPE_KEY) {
      this.setState({
          editText: this.props.content,
          editing: false
        });
    } else if (e.which === this.ENTER_KEY) {
      this.handleSubmit(e);
    }
  }
 
  render() {
    return (
      <div className="editable-text-container">
        <div className="content-div">
          <p className={this.state.editing ? 'hidden' : 'show-p'}>{this.state.editText}</p>
          <textarea 
            rows="3"
            className={this.state.editing ? 'show-input' : 'hidden'} 
            value={this.state.editText} 
            onChange={this.handleChange} 
            onBlur={this.handleSubmit}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <button id="edit" onClick={this.handleEditButtonClick}><i className="fa fa-pencil" aria-hidden="true"></i></button>
      </div>      
    );
  }
}

export default withFirebase(EditableText);