import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class demandRepository {
  async create(userId: number, activityId: number, status: string) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO demand (user_id, activity_id, status)
      VALUES (?, ?, ?)`,
      [userId, activityId, status],
    );

    return result.insertId;
  }
}

export default new demandRepository();
