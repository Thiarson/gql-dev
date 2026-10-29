import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import type { GraphQLFieldConfig } from 'graphql';

type SumArgs = { begin: number; end: number; };

const currentTime: GraphQLFieldConfig<unknown, unknown> = {
  type: GraphQLString,
  resolve: () => {
    const isoString = new Date().toISOString();
    return isoString.slice(11, 19);
  },
};

const sumNumbersInRange: GraphQLFieldConfig<unknown, unknown, SumArgs> = {
  type: new GraphQLNonNull(GraphQLInt),
  args: {
    begin: { type: new GraphQLNonNull(GraphQLInt) },
    end: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (_source, { begin, end }) => {
    let sum = 0;
    for (let i = begin; i <= end; i++) {
      sum += i;
    }
    return sum;
  },
};

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: { currentTime, sumNumbersInRange },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});
