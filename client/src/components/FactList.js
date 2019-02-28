import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getFactsQuery } from "../queries/queries";
import FactDetails from "./FactDetails";
import { MoonLoader } from "react-spinners";

class FactList extends Component {
  state = {
    selected: null
  };
  displayFacts = () => {
    var { data } = this.props;
    if (data.loading) {
      return (
        <div className="sweet-loading-holder">
          <div className="sweet-loading">
            <MoonLoader
              sizeUnit={"px"}
              size={150}
              color={"#FF5F63"}
              loading={data.loading}
            />
          </div>
        </div>
      );
    } else {
      return [...data.facts].reverse().map(fact => {
        const sel =
          this.state.selected === fact.id ? (
            <article>
              <FactDetails factId={this.state.selected} />
            </article>
          ) : (
            <article>{fact.body}</article>
          );
        return (
          <li
            key={fact.id}
            onClick={e => {
              this.setState({ selected: fact.id });
            }}
          >
            <div>{fact.author.name}</div>
            {sel}
          </li>
        );
      });
    }
  };
  render() {
    return (
      <div className="main">
        <ul className="book-list">{this.displayFacts()}</ul>
      </div>
    );
  }
}

export default graphql(getFactsQuery)(FactList);
