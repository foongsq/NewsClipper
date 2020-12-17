// The MIT License (MIT)

// Copyright (c) 2018 HackerOne Inc and individual contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React from "react";
import DatePicker from "react-datepicker";
import { Redirect } from 'react-router-dom';
import './DatePicker.css';
import './react-datepicker.css';
 
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