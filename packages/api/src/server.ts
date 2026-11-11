import { Hono } from 'hono';
import { graphql } from 'graphql';

import { schema } from './schema';
import { pg } from './db/pg-client';
import { mongo } from './db/mongo-client';

import type { Context } from './context';

const app = new Hono();

app.post('/graphql', async (c) => {
  const { query } = await c.req.json<{ query: string }>();

  const result = await graphql({
    schema,
    source: query,
    contextValue: { pg, mongo } satisfies Context,
  });

  return c.json(result);
});

export default app;
