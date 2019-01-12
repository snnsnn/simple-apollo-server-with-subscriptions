import { gql } from "apollo-server";

const typeDefs = gql`
  input UserInput {
    firstName: String
    lastName: String
  }

  type Query {
    getUser(id: Int): User
  }

  type Mutation {
    addUser(input: UserInput): User
  }

  type Subscription {
    greeting: String

    userAdded: User
    
    # Subscrpition with filter
    # https://www.apollographql.com/docs/apollo-server/features/subscriptions.html#subscription-filters
    userCreated(firstName: String): User
  }

  type User {
    id: Int
    firstName: String
    lastName: String
  }
`;

export default typeDefs;
