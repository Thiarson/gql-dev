import { Hono } from 'hono';
import { graphql } from 'graphql';

import { schema } from './schema';

const app = new Hono();

app.post('/graphql', async (c) => {
  const { query } = await c.req.json();

  const result = await graphql({
    schema,
    source: query,
  });

  return c.json(result);
});

export default app;
