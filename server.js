import express from 'express';
import Schema from './api/schema';
import Resolvers from './api/resolvers';
// import Mocks from './api/mocks';

import { apolloExpress, graphiqlExpress, } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';

const GRAPHQL_PORT = 8080;

const graphQLServer = express();

const executableSchema = makeExecutableSchema({
  graphiql: true,  //
  pretty: true,  //
  printErrors: true,
  typeDefs: Schema,
  resolvers: Resolvers,
  allowUndefinedInResolve: false,
  printErrors: true,
});

// addMockFunctionsToSchema({
//   schema: executableSchema,
//   mocks: Mocks,
//   preserveResolvers: true,
// });

graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  context: {},  // `context` must be an object and can't be undefined when using connectors
}));

const starterQuery = '{ \n \
  author (firstName: "Edmond", lastName: "Jones") { \n \
    id \n \
    firstName \n \
    lastName \n \
    posts { \n \
      id \n \
      title \n \
      text \n \
      views \n \
    } \n \
  } \n \
  getFortuneCookie \n \
}';

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: starterQuery,
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
));
