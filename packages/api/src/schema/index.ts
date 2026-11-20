import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  printSchema,
} from 'graphql';

import Task from './types/task';
import { numbersInRangeObject } from '../utils';
import NumbersInRange from './types/numbers-in-range';

import type { Context } from '../context';
import type { GraphQLFieldConfig } from 'graphql';

type SumArgs = { begin: number; end: number; };

const currentTime: GraphQLFieldConfig<unknown, Context> = {
  type: GraphQLString,
  resolve: () => {
    const isoString = new Date().toISOString();
    return isoString.slice(11, 19);
  },
};

const numbersInRange: GraphQLFieldConfig<unknown, Context, SumArgs> = {
  type: NumbersInRange,
  args: {
    begin: { type: new GraphQLNonNull(GraphQLInt) },
    end: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (_source, { begin, end }) => {
    return numbersInRangeObject(begin, end);
  },
};

const taskMainList: GraphQLFieldConfig<unknown, Context> = {
  type: new GraphQLList(Task),
  resolve: async (_source, _args, { pg }) => {
    const tasks = await pg.taskMainList();
    return tasks;
  },
}

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: { currentTime, numbersInRange, taskMainList },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});

console.log(printSchema(schema));
