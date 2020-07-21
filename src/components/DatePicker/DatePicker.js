import React from "react";
import DatePicker from "react-datepicker";
import { Redirect } from 'react-router-dom';
import './DatePicker.css';
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
export default class Example extends React.Component {
  state = {
    startDate: new Date(),
    redirect: false
  };
 
  handleChange = date => {
    this.setState({
      startDate: date,
      redirect: true
    });
    
  };
 
  render() {
    if (this.state.redirect) {
      return (
      <div>
        <DatePicker
          className="date-picker"
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
        <Redirect to={{
        pathname: `/${this.state.startDate.toLocaleDateString().replace(/\//g, "-")}`
      }}/>
      </div>);
    } else {
      return (
        <DatePicker
          className="date-picker"
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
      );
    }
    
  }
}