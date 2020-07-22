import React from "react";
import DatePicker from "react-datepicker";
import { Redirect } from 'react-router-dom';
import './DatePicker.css';
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
export default class Example extends React.Component {
  state = {
    date: new Date(),
    redirect: false
  };
 
  handleChange = date => {
    this.setState({
      date: date,
      redirect: true
    });
    
  };
 
  render() {
    if (this.state.redirect) {
      let date = this.state.date;
      let datestring = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      return (
      <div>
        <DatePicker
          className="date-picker"
          selected={this.state.date}
          onChange={this.handleChange}
        />
        <Redirect to={{
        pathname: `/${datestring}`
      }}/>
      </div>);
    } else {
      return (
        <DatePicker
          className="date-picker"
          selected={this.state.date}
          onChange={this.handleChange}
        />
      );
    }
    
  }
}