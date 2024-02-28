// const { buildSchema } = require('graphql')

// const schema = buildSchema(`
//     type: User {
//         id: ID!
//         name: String!
//         lastname: String!
//         email: String!
//         avatar: String!
//     }
//     type: Message {
//         id: ID!
//         body: String!
//         from: User!
//         to: User!
//         readed: Boolean
//     }
//     type: House {
//         id: ID!
//         address: String!
//         city: String!
//         state: String!
//         size: Int!
//         type: String!
//         zip_code: String!
//         code: String!
//         rooms: Int!
//         bathrooms: Int!
//         price: Int!
//         image: String!
//     }`)

// module.exports = schema

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLSchema } = require('graphql');
const resolvers = require('./resolvers');

const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        lastname: {type: GraphQLString},
        email: {type: GraphQLString},
        avatar: {type: GraphQLString},
    }
})

const Message = new GraphQLObjectType({
    name: 'Message',
    fields: {
        _id: {type: GraphQLID},
        body: {type: GraphQLString},
        from: {type: User},
        to: {type: User},
        readed: {type: GraphQLBoolean},
    }
})

const UserFilterInput = new GraphQLInputObjectType({
    name: 'UserFilterInput',
    fields: {
        name: {type: GraphQLString},
        lastname: {type: GraphQLString},
        email: {type: GraphQLString},
    }
})

const queries = {
    hello: {
      type: GraphQLString, // Tipo de respuesta
      resolve: resolvers.hello
    },
    User: {
      type: User,
      resolve: resolvers.User,
      args: {
        id: {type: GraphQLString}
      }
    },
    Users: {
      type: GraphQLList(User),
      resolve: resolvers.Users
    },
    UsersByFilter: {
      type: GraphQLList(User),
      resolve: resolvers.UsersByFilter,
      args: {
        filter: { type: UserFilterInput }
      }
    }
  }
  
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: queries
  })
  
  const schema = new GraphQLSchema({
    query: queryType
  })
  
  module.exports = schema