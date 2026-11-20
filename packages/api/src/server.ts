import { Hono } from 'hono';
import { graphql, GraphQLError } from 'graphql';
import { HTTPException } from 'hono/http-exception';

import pgAPi from './db/pg-api';
import { schema } from './schema';
import { mongo } from './db/mongo-client';

import type { Context } from './context';

const app = new Hono();
const pg = await pgAPi();

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  console.error(err);
  return c.json({ errors: [{ message: 'Internal Server Error' }] }, 500);
});

app.post('/graphql', async (c) => {
  const { query } = await c.req.json<{ query: string }>();

  const result = await graphql({
    schema,
    source: query,
    contextValue: { pg, mongo } satisfies Context,
  });

  if (result.errors) {
    for (const err of result.errors) {
      console.error(err.cause ?? err);
    }

    return c.json({
      data: result.data,
      errors: result.errors.map((err) =>
        err.cause instanceof GraphQLError || !err.cause
          ? { message: err.message, path: err.path, extensions: err.extensions }
          : { message: 'Internal server error', path: err.path }
      ),
    });
  }

  return c.json(result);
});

export default app;
