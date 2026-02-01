import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type newUserType = {
  userId: number;
  activityId: number;
  status: string;
};

class ParticipationRepository {
  async create(newParticipant: newUserType) {
    const [Result] = await databaseClient.query<Result>(
      `INSERT INTO participation (status, user_id, activity_id)
        VALUES ('${newParticipant.status}', ${newParticipant.userId}, ${newParticipant.activityId})`,
    );

    return Result;
  }

  async read(usedId: number, activityId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM participation AS p
      WHERE p.user_id = ? AND p.activity_id = ?`,
      [usedId, activityId],
    );

    return rows[0];
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
      `DELETE FROM participation WHERE user_id = ? AND activity_id = ?`,
      [userId, activityId],
    );

    return result;
  }
}

export default new ParticipationRepository();
