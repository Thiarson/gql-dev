import { Hono } from 'hono';
import { graphql } from 'graphql';

import pgAPi from './db/pg-api';
import { schema } from './schema';
import { mongo } from './db/mongo-client';

import type { Context } from './context';

const app = new Hono();
const pg = await pgAPi();

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
