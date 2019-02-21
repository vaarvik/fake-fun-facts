import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import {
  getAuthorsQuery,
  getFactsQuery,
  addFactMutation
} from "../queries/queries";

class AddFact extends Component {
  state = {
    body: "",
    authorId: "",
    formActive: false
  };
  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  toggleForm = () => {
    this.state.formActive
      ? this.setState({ formActive: false })
      : this.setState({ formActive: true });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.addFactMutation({
      variables: {
        body: this.state.body,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getFactsQuery }]
    });
    this.toggleForm();
  };

  displayForm = () => {
    if (this.state.formActive) {
      return (
        <div>
          <div className="lightbox" onClick={this.toggleForm} />
          <form onSubmit={this.submitForm}>
            <div>
              <h2>Add a Fake Fun Fact</h2>
              <div className="field">
                <label htmlFor="body">Body:</label>
                <textarea
                  name="body"
                  id=""
                  onChange={e => this.setState({ body: e.target.value })}
                  cols="30"
                  rows="3"
                />
              </div>
              <div className="field">
                <select
                  name="author"
                  id=""
                  onChange={e => this.setState({ authorId: e.target.value })}
                >
                  <option>Select Author</option>
                  {this.displayAuthors()}
                </select>
              </div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      );
    } else {
      return <figure onClick={this.toggleForm}>+</figure>;
    }
  };

  render() {
    return this.displayForm();
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(getFactsQuery, { name: "getFactsQuery" }),
  graphql(addFactMutation, { name: "addFactMutation" })
)(AddFact);
