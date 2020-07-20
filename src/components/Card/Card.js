import React from 'react';
import './Card.css';
import EditableText from '../EditableText/EditableText';

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <EditableText 
          content={this.props.title} 
          type="title" 
          date={this.props.date} 
          id={this.props.id} />
        <a target="_blank" href={this.props.url}>Link</a>
        <EditableText 
        content={this.props.summary} 
        type="summary" 
        date={this.props.date} 
        id={this.props.id} />
        <p>{new Date(this.props.timestamp).toLocaleDateString()} {new Date(this.props.timestamp).toLocaleTimeString()}</p>
      </div>
    );
  }
}

export default Card;