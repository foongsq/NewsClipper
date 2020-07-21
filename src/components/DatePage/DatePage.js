import React from 'react';
import { withFirebase } from '../../Firebase/index';
import AuthenticationPage from '../AuthenticationPage/AuthenticationPage';
import Card from '../Card/Card';
import CardList from './CardList';
import './DatePage.css';

 class DatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddClippingForm: false,
      title: '-',
      url: null,
      summary: '-',
      newsclippings: [],
    }
    this.handleOpenFormClick = this.handleOpenFormClick.bind(this); 
    this.handleCloseFormClick = this.handleCloseFormClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.addClippingToDatabase = this.addClippingToDatabase.bind(this);
    this.refresh = this.refresh.bind(this);
    this.onClippingDataChange = this.onClippingDataChange.bind(this);
    
    if (this.props.firebase.auth.currentUser) {
      this.ref = this.props.firebase.database.ref().child('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child('newsclippings')
      .child(this.props.match.params.date)
      this.ref.on('value', this.onClippingDataChange);
    }
  }

  onClippingDataChange(snapshot) {
    let newsclippings = [];
    let value = snapshot.val();
    newsclippings.push(value);
    let arr = []
    if (newsclippings.length > 0 && newsclippings[0] !== null) {
      let keys = Object.keys(newsclippings[0])
      keys.forEach(key => {
        console.log(key)
        arr[key] = newsclippings[0][key];
      })
    }
    this.setState({ newsclippings: arr });
  }

  async refresh() {
    // console.log('called comdidmount')
    let newsclippings = [];
    if (this.props.firebase.auth.currentUser) {
      let tempref = this.props.firebase.database.ref().child('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child('newsclippings')
      .child(this.props.match.params.date)
      let snapshot = await tempref.once('value');
      let value = snapshot.val();
      newsclippings.push(value);
      // console.log('newsclippings', newsclippings);
    }
    let arr = []
    if (newsclippings.length > 0 && newsclippings[0] !== null) {
      let keys = Object.keys(newsclippings[0])
      keys.forEach(key => {
        console.log(key)
        arr[key] = newsclippings[0][key];
      })
      // console.log('arr', arr)
    }
    this.setState({ newsclippings: arr });
  }

  handleOpenFormClick() {
    this.setState({ openAddClippingForm: true });
  }

  handleCloseFormClick() {
    this.setState({ openAddClippingForm: false });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleURLChange(event) {
    this.setState({ url: event.target.value });
  }

  handleSummaryChange(event) {
    this.setState({ summary: event.target.value });
  }

  addClippingToDatabase(event) {
    this.props.firebase.database.ref().child('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child('newsclippings')
      .child(this.props.match.params.date)
      .push({
        title: this.state.title,
        url: this.state.url,
        summary: this.state.summary,
        timestamp: new Date().toString(),
      });
    window.alert("Clipping added successfully!")
    event.preventDefault();
    this.addClippingForm.reset();
  }

  render() {   
    // console.log('this.state.newsclippings', this.state.newsclippings)
    let date = this.props.match.params.date;
    if (this.props.firebase.auth.currentUser) {
      return (
        <div className="datepage-container">
          <h1>{new Date(date).toDateString()}</h1>
          <div className="buttons">
            <button onClick={this.refresh}>Refresh</button>
            {this.state.openAddClippingForm
              ? <button onClick={this.handleCloseFormClick}><i className="fa fa-times" aria-hidden="true"></i></button>
              : <button onClick={this.handleOpenFormClick}>Add News Clipping</button>}
          </div>
         
          {this.state.openAddClippingForm
            ? <form ref={(el) => this.addClippingForm = el} className="form">
              <label>Title:<input className="input" type="text" onChange={this.handleTitleChange} placeholder="Enter title here"/></label>
              <label>URL:<input className="input" type="text" onChange={this.handleURLChange} placeholder="Enter URL here" required/></label>
              <label>Summary:<input className="input" type="text" onChange={this.handleSummaryChange} placeholder="Enter summary here"/></label>
              <div className="button-div">
                {this.props.firebase.auth.currentUser 
                  ? <input type="submit" onClick={this.addClippingToDatabase} className="button" />
                  : <input type="submit" disabled /> }
              </div>
            </form>
            : null }
          
          <CardList newsclippings={this.state.newsclippings} date={date} />
        </div>
      );
    } else {
      return <p style={{textAlign: 'center'}}>Please Sign In to continue</p>;
    }    
  }
}

export default withFirebase(DatePage);