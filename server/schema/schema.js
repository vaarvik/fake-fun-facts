const graphql = require("graphql");
const _ = require("lodash");
const Fact = require("../models/facts");
const Author = require("../models/authors");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const FactType = new GraphQLObjectType({
  name: "Fact",
  fields: () => ({
    id: { type: GraphQLID },
    body: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        //console.log(parent);
        //return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    facts: {
      type: new GraphQLList(FactType),
      resolve(parent, args) {
        //return _.filter(facts, { authorId: parent.id });
        return Fact.find({ authorId: parent.id });
      }
    }
  })
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    fact: {
      type: FactType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/other source
        //return _.find(facts, { id: args.id });
        return Fact.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      }
    },
    facts: {
      type: new GraphQLList(FactType),
      resolve(parent, args) {
        //return facts;
        return Fact.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //return authors;
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addFact: {
      type: FactType,
      args: {
        body: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let fact = new Fact({
          body: args.body,
          authorId: args.authorId
        });
        return fact.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
});
