import { sql } from "./pg-client"

import type { TaskRow } from "../schema/types/task";
import type { UserRow } from "../schema/types/user";
import type { ApproachRow } from "../schema/types/approach";

export interface PgAPi {
  taskMainList: () => Promise<TaskRow[]>,
  userInfo: (userId: string) => Promise<UserRow | undefined>,
  approachList: (taskId: string) => Promise<ApproachRow[]>,
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
    },

    approachList: async (taskId) => {
      return await sql<ApproachRow[]>`
        SELECT id, content, vote_count AS "voteCount", created_at AS "createdAt", task_id AS "taskId", user_id AS "userId"
        FROM approaches
        WHERE task_id = ${taskId}
        ORDER BY vote_count DESC, created_at DESC
      `;
    },
  }
}

export default pgApi;
