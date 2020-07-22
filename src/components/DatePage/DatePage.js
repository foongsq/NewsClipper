import React from 'react';
import { withFirebase } from '../../Firebase/index';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Card from '../Card/Card';
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
      authUser: null,
      authWasListened: false,
    }
    this.formatDate = this.formatDate.bind(this);
    this.handleOpenFormClick = this.handleOpenFormClick.bind(this); 
    this.handleCloseFormClick = this.handleCloseFormClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.addClippingToDatabase = this.addClippingToDatabase.bind(this);
    this.refresh = this.refresh.bind(this);
    this.onClippingDataChange = this.onClippingDataChange.bind(this);
    this.setAuthUser = this.setAuthUser.bind(this);
    this.setAuthWasListened = this.setAuthWasListened.bind(this);
    this.authListener = this.props.firebase.auth.onAuthStateChanged(
      (authUser) => {
        if(authUser) {
          this.setAuthUser(authUser);
          this.setAuthWasListened(true);
          this.refresh();
          this.ref = this.props.firebase.database.ref().child('users')
          .child(this.props.firebase.auth.currentUser.uid)
          .child('newsclippings')
          .child(this.props.match.params.date)
          this.ref.on('value', this.onClippingDataChange);
        } else {
          this.setAuthUser(null);
          this.setAuthWasListened(true);
        }
      }
    );
  }

  formatDate(date) {
    let year = date.split("-")[0];
    let month = date.split("-")[1];
    let day = date.split("-")[2];

    if (month === '1') {
      return `${day} January ${year}`;
    } else if (month === '2') {
      return `${day} February ${year}`;
    } else if (month === '3') {
      return `${day} March ${year}`;
    } else if (month === '4') {
      return `${day} April ${year}`;
    } else if (month === '5') {
      return `${day} May ${year}`;
    } else if (month === '6') {
      return `${day} June ${year}`;
    } else if (month === '7') {
      return `${day} July ${year}`;
    } else if (month === '8') {
      return `${day} August ${year}`;
    } else if (month === '9') {
      return `${day} September ${year}`;
    } else if (month === '10') {
      return `${day} October ${year}`;
    } else if (month === '11') {
      return `${day} November ${year}`;
    } else {
      return `${day} December ${year}`;
    }
  }
  setAuthUser(user) {
    this.setState({ authUser: user });
  }

  setAuthWasListened(boolean) {
    this.setState({ authWasListened: boolean });
  }

  onClippingDataChange(snapshot) {
    let newsclippings = [];
    let value = snapshot.val();
    newsclippings.push(value);
    let arr = []
    if (newsclippings.length > 0 && newsclippings[0] !== null) {
      let keys = Object.keys(newsclippings[0])
      keys.forEach(key => {
        arr[key] = newsclippings[0][key];
      })
    }
    this.setState({ newsclippings: arr });
  }

  async refresh() {
    console.log('called refresh',this.props.match.params.date)
    let newsclippings = [];
    this.setState({ newsclippings: newsclippings });
    if (this.props.firebase.auth.currentUser) {
      let tempref = this.props.firebase.database.ref().child('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child('newsclippings')
      .child(this.props.match.params.date)
      let snapshot = await tempref.once('value');
      let value = snapshot.val();
      newsclippings.push(value);
    }
    let arr = []
    if (newsclippings.length > 0 && newsclippings[0] !== null) {
      let keys = Object.keys(newsclippings[0])
      keys.forEach(key => {
        arr[key] = newsclippings[0][key];
      })
    }
    console.log('arr', arr)
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
  
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.refresh();
    }
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
    this.setState({
      title: '-',
      url: null,
      summary: '-',
      newsclippings: [],})
    this.refresh();
  }

  render() {   
    let date = this.props.match.params.date;
    
    let keys = [];
    if (this.state.newsclippings) {
      keys = Object.keys(this.state.newsclippings);
    }
    if (this.props.firebase.auth.currentUser) {
      return (
        <div className="datepage-container">
          <h1>{this.formatDate(date)}</h1>
          <div className="buttons">
            <button onClick={this.refresh}>Refresh</button>
            {this.state.openAddClippingForm
              ? <button onClick={this.handleCloseFormClick}><i className="fa fa-times" aria-hidden="true"></i></button>
              : <button onClick={this.handleOpenFormClick}>Add News Clipping</button>}
          </div>
         
          {this.state.openAddClippingForm
            ? <div className="form-container"><form ref={(el) => this.addClippingForm = el} className="form">
              <label>Title:<input className="input" type="text" onChange={this.handleTitleChange} placeholder="Enter title here"/></label>
              <label>URL:<input className="input" type="text" onChange={this.handleURLChange} placeholder="Enter URL here" required/></label>
              <label>Summary:<input className="input" type="text" onChange={this.handleSummaryChange} placeholder="Enter summary here"/></label>
              <div className="button-div">
                {this.props.firebase.auth.currentUser 
                  ? <input type="submit" onClick={this.addClippingToDatabase} className="submit-button" />
                  : <input type="submit" className="submit-button" disabled /> }
              </div>
            </form></div>
            : null }
          {/* <p>{keys}</p> */}
          {/* <CardList newsclippings={this.state.newsclippings} date={date} /> */}
          {this.state.newsclippings 
            ? keys.reverse().map(id => {
              let obj = this.state.newsclippings[id];
              // console.log('obj', obj)
              return (
                <Card 
                  title={obj.title} 
                  url={obj.url} 
                  summary={obj.summary} 
                  timestamp={obj.timestamp}
                  date={date} 
                  id={id}
                />
              );
          }) : null}
        </div>
      );
    } else {
      return <p style={{textAlign: 'center'}}>Please Sign In to continue</p>;
    }    
  }
}

export default compose(withFirebase, withRouter)(DatePage);