import React, { Component } from "react";
import FactList from "./components/FactList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddFact from "./components/AddFact";

//Apollo Client Setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <h1>Fake Fun Facts</h1>
          <FactList />
          <AddFact />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
