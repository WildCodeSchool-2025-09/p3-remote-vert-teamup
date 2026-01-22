import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class DemandRepository {
  async create(userId: number, activityId: number) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO demand (status, user_id, activity_id)
            VALUES ('pending', ${userId}, ${activityId})`,
    );

    return result;
  }
}

export default new DemandRepository();
