import { SQL } from 'bun';

export const sql = new SQL({
  url: process.env.DATABASE_URL!,
  max: 10,
  idleTimeout: 30,
  maxLifetime: 3600,
  connectionTimeout: 10,
});

process.on('SIGTERM', async () => {
  await sql.close({ timeout: 5 });
  process.exit(0);
});
