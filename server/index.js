const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

// Define GraphQL schema
const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
  }
`;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true });

const Book = mongoose.model('Book', {
  title: String,
  author: String,
});

// Define resolvers
const resolvers = {
  Query: {
    books: async () => {
      return await Book.find();
    },
  },
  Mutation: {
    addBook: async (_, { title, author }) => {
      const book = new Book({ title, author });
      await book.save();
      return book;
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Apollo Server running at ${url}`);
});
