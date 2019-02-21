import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getFactQuery } from "../queries/queries";

class AddFact extends Component {
  displayFactDetails = () => {
    const data = this.props.data.fact;
    if (data) {
      return (
        <div className="fact-details">
          <h2>{data.body}</h2>
          <p>
            All facts by {data.author.name} ({data.author.age}):
          </p>
          <ul>
            {data.author.facts.map(fact => {
              return <li key={fact.id}>{fact.body}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return;
    }
  };
  render() {
    console.log(this.props);
    return <div id="fact-details">{this.displayFactDetails()}</div>;
  }
}

export default graphql(getFactQuery, {
  options: props => {
    return {
      variables: {
        id: props.factId
      }
    };
  }
})(AddFact);
