import { sql } from "./pg-client"

import type { TaskRow } from "../schema/types/task";

export interface PgAPi {
  taskMainList: () => Promise<TaskRow[]>
}

const pgApi = async (): Promise<PgAPi> => {
  return {
    taskMainList: () => sql<TaskRow[]>`
      SELECT id, content, tags, approach_count AS "approachCount", created_at AS "createdAt"
      FROM tasks
      WHERE is_private = ${false}
      ORDER BY created_at DESC
      LIMIT ${100}
    `,
  }
}

export default pgApi;
