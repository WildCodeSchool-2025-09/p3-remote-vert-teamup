import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type newUserType = {
  userId?: number;
  activityId?: number;
  status?: string;
};

class ParticipationRepository {
  async create(newParticipant: newUserType) {
    const [Result] = await databaseClient.query<Result>(
      `INSERT INTO participation (status, user_id, activity_id)
        VALUES ('${newParticipant.status}', ${newParticipant.userId}, ${newParticipant.activityId})`,
    );

    return Result;
  }

  async read(newParticipant: newUserType) {
    const conditions = [];
    const params = [];

    if (newParticipant.userId) {
      conditions.push("p.user_id = ?");
      params.push(newParticipant.userId);
    }

    if (newParticipant.activityId) {
      conditions.push("p.activity_id = ?");
      params.push(newParticipant.activityId);
    }

    const query = conditions.length > 0 && ` WHERE ${conditions.join(" AND ")}`;

    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM participation AS p
      ${query}`,
      params,
    );

    return rows;
  }

  async update(userId: number, activityId: number, status: string) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE participation SET status = ?, updated_at = NOW()
       WHERE user_id = ? AND activity_id = ?`,
      [status, userId, activityId],
    );

    return result;
  }

  async delete(userId: number, activityId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM participation WHERE user_id = ? AND activity_id = ?",
      [userId, activityId],
    );

    return result;
  }
}

export default new ParticipationRepository();
