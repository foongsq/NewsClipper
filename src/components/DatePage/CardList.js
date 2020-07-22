import React from 'react';
import Card from '../Card/Card';
import { withFirebase } from '../../Firebase';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsclippings: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    let newsclippings = nextProps.newsclippings;
    this.setState({ newsclippings: newsclippings });
  }

  render() {
    console.log('news clippings received as props', this.state.newsclippings)
    let keys = [];
    if (this.state.newsclippings) {
      keys = Object.keys(this.state.newsclippings);
      // console.log(keys);
    }
    return (
      <div>
        {this.state.newsclippings 
        ? keys.reverse().map(id => {
          let obj = this.state.newsclippings[id];
          console.log('obj', obj)
          return (
            <Card 
              title={obj.title} 
              url={obj.url} 
              summary={obj.summary} 
              timestamp={obj.timestamp}
              date={this.props.date} 
              id={id}
            />
          );
      }) : null}
    </div>
    );
  }
}

export default withFirebase(CardList);
