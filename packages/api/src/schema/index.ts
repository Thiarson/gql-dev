import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import NumbersInRange from './types/numbers-in-range';
import { numbersInRangeObject } from '../utils';

import type { GraphQLFieldConfig } from 'graphql';

type SumArgs = { begin: number; end: number; };

const currentTime: GraphQLFieldConfig<unknown, unknown> = {
  type: GraphQLString,
  resolve: () => {
    const isoString = new Date().toISOString();
    return isoString.slice(11, 19);
  },
};

const numbersInRange: GraphQLFieldConfig<unknown, unknown, SumArgs> = {
  type: NumbersInRange,
  args: {
    begin: { type: new GraphQLNonNull(GraphQLInt) },
    end: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (_source, { begin, end }) => {
    return numbersInRangeObject(begin, end);
  },
};

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: { currentTime, numbersInRange },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});
