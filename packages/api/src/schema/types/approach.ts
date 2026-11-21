import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import User from "./user";
import type { Context } from "../../context";

export type ApproachRow = {
  id: string;
  content: string;
  voteCount: number;
  createdAt: Date;
  userId: string;
}

const Approach = new GraphQLObjectType<ApproachRow, Context>({
  name: 'Approach',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    voteCount: { type: new GraphQLNonNull(GraphQLInt) },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source.createdAt.toISOString(),
    },

    author: {
      type: new GraphQLNonNull(User),
      resolve: ({ userId }, _args, { pg }) => {
        return pg.userInfo(userId);
      }
    },
  },
});

export default Approach;
