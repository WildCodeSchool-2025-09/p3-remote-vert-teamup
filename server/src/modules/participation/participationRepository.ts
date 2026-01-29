import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class participationRepository {
  async readAllParticipants(activityId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT participation.id, participation.status, user.id as userId, user.username, user.picture FROM participation
      JOIN user ON participation.user_id = user.id
      WHERE participation.activity_id = ?`,
      [activityId],
    );

    return rows as Participant[];
  }

  async create(userId: number, activityId: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO participation (user_id, activity_id, status) VALUES (?, ?, 'inviting')",
      [userId, activityId],
    );

    return result.insertId;
  }

  async patch(id: number, status: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE participation SET status = ? WHERE participation.id = ?",
      [status, id],
    );
    return result.affectedRows;
  }

  async validate(userId: number, activityId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM participation WHERE user_id = ? AND activity_id = ?",
      [userId, activityId],
    );
    return rows as Participant[];
  }
}

export default new participationRepository();
