import { PubSub, withFilter } from 'apollo-server';
const pubsub = new PubSub();

setInterval(() => {
  pubsub.publish(`GREETING`, { greeting: `Hello World ${new Date()}` });
}, 1000);


interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const users: Array<User> = [
  { id: 0, firstName: 'John', lastName: 'Doe' },
  { id: 1, firstName: 'Jane', lastName: 'Doe' },
  { id: 2, firstName: 'Jenny', lastName: 'Doe' },
  { id: 2, firstName: 'Sally', lastName: 'Doe' },
];

const resolvers = {
  Query: {
    getUser(parent: any, args: any, context: any, info: any) {
      return users[args.id];
    },
  },

  Mutation: {
    addUser(parent: any, args: any, context: any, info: any) {
      // get input data
      const newUser = { id: users.length, ...args.input }

      // add newUser
      users.push(newUser);

      // Emit userAdded event with newUser data
      pubsub.publish(`USER_ADDED`, { userAdded: newUser });
      
      // Emit userCreated event with newUser data
      pubsub.publish(`USER_CREATED`, { userCreated: newUser });
      return newUser;
    },
  },

  Subscription: {
    greeting: {
      // Subscribe to single event
      subscribe: () => pubsub.asyncIterator('GREETING'),
    },

    userAdded: {
      // Subscribe to multiple event
      subscribe: () => pubsub.asyncIterator(['USER_ADDED'])
    },

    userCreated: {
      // Use subscription filter, event will be emited 
      // if created user's firstName mactches the firstName in the query variables
      subscribe: withFilter(
        () => pubsub.asyncIterator('USER_CREATED'),
        (payload, variables) => {
          return payload.userCreated.firstName === variables.firstName;
        },
      )
    }
  },
};

export default resolvers;
