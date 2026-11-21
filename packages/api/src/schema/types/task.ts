import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import User from './user';
import type { Context } from '../../context';
import Approach from './approach';

export type TaskRow = {
  id: string;
  content: string;
  tags: string;
  approachCount: number;
  createdAt: Date;
  userId: string;
}

const Task = new GraphQLObjectType<TaskRow, Context>({
  name: 'Task',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    tags: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      resolve: (source) => source.tags.split(','),
    },
    approachCount: { type: new GraphQLNonNull(GraphQLInt) },
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

    approachList: {
      type: new GraphQLNonNull(
        new GraphQLList(
          new GraphQLNonNull(Approach),
        ),
      ),
      resolve: ({ id }, _args, { pg }) => {
        return pg.approachList(id);
      }
    },
  },
});

export default Task;
