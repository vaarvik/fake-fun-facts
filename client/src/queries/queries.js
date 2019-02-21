import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      age
      id
    }
  }
`;

const getFactsQuery = gql`
  {
    facts {
      body
      author {
        name
      }
      id
    }
  }
`;

const addFactMutation = gql`
  mutation($body: String!, $authorId: ID!) {
    addFact(body: $body, authorId: $authorId) {
      body
      id
    }
  }
`;

const getFactQuery = gql`
  query($id: ID) {
    fact(id: $id) {
      id
      body
      author {
        id
        name
        age
        facts {
          body
          id
        }
      }
    }
  }
`;
export { getAuthorsQuery, getFactsQuery, addFactMutation, getFactQuery };
