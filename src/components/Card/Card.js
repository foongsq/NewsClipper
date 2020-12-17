import React from 'react';
import './Card.css';
import EditableText from '../EditableText/EditableText';
import { withFirebase } from '../../Firebase/index';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.ESCAPE_KEY = 27;
    this.ENTER_KEY = 13;
    this.state = {
      editText: this.props.content,
      editing: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    // this.handleAddURLClick = this.handleAddURLClick.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDelete() {
    // console.log('called handledelete')
    this.props.firebase.database.ref()
      .child('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child('newsclippings')
      .child(this.props.date)
      .child(this.props.id)
      .remove();
  }

  // handleAddURLClick() {
  //   if (this.state.editing) {
  //     this.handleSubmit();
  //   } else {
  //     this.setState({
  //       editing: true,
  //     });
  //   }
  // }

  // handleSubmit () {
  //   let val = this.state.editText;
  //   if (this.props.type === "title") { //update title
  //     this.props.firebase.database.ref('users')
  //       .child(this.props.firebase.auth.currentUser.uid)
  //       .child("newsclippings")
  //       .child(this.props.date)
  //       .child(this.props.id)
  //       .update({
  //         title: val,
  //       });
  //   } else { //update summary
  //     this.props.firebase.database.ref('users')
  //       .child(this.props.firebase.auth.currentUser.uid)
  //       .child("newsclippings")
  //       .child(this.props.date)
  //       .child(this.props.id)
  //       .update({
  //         summary: val,
  //       });
  //   }
   
	//   if (val) {
	// 	  this.setState({
  //       editText: val,
  //       editing: false,
  //     });
	//   } 
  // }
  
  render() {
    return (
      <div className="card">
        <div className="inner-card">
          <EditableText 
            content={this.props.title} 
            type="title" 
            date={this.props.date} 
            id={this.props.id} />
          <div style={{display: 'flex', alignItems:'center', padding: '0', margin: '0'}}>
            <p style={{padding: '0', margin: '0', marginRight:'0.5rem'}}>Summary: </p>
            <EditableText 
              content={this.props.summary} 
              type="summary" 
              date={this.props.date} 
              id={this.props.id} />
          </div>
          <div className="link"><a target="_blank" href={this.props.url}>{this.props.url}</a>
          </div>
          {/* <button onClick={this.handleAddURLClick}>Add URL</button> */}
          <div className="time-and-delete-div">
            <p className="timestamp">{new Date(this.props.timestamp).toLocaleDateString()} {new Date(this.props.timestamp).toLocaleTimeString()}</p>
            <button id="delete-button" onClick={this.handleDelete}><i className="fa fa-trash" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Card);