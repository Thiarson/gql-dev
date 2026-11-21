import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import type { Context } from "../../context";

export type UserRow = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

const User = new GraphQLObjectType<UserRow, Context>({
  name: 'User',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ firstName, lastName }) => [firstName, lastName].filter(Boolean).join(' '),
    },
  },
});

export default User;
