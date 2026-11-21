import { sql } from "./pg-client"

import type { TaskRow } from "../schema/types/task";
import type { UserRow } from "../schema/types/user";

export interface PgAPi {
  taskMainList: () => Promise<TaskRow[]>,
  userInfo: (userId: string) => Promise<UserRow | undefined>,
}

const pgApi = async (): Promise<PgAPi> => {
  return {
    taskMainList: () => sql<TaskRow[]>`
      SELECT id, content, tags, approach_count AS "approachCount", created_at AS "createdAt", user_id as "userId"
      FROM tasks
      WHERE is_private = ${false}
      ORDER BY created_at DESC
      LIMIT ${100}
    `,

    userInfo: async (userId) => {
      const [user] = await sql<UserRow[]>`
        SELECT id, username, first_name AS "firstName", last_name AS "lastName", created_at AS "createdAt"
        FROM users
        WHERE id = ${userId}
      `;
      return user;
    }
  }
}

export default pgApi;
