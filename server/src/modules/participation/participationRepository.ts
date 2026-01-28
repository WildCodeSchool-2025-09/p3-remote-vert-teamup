import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

class ParticipationRepository {
  async readAll(userId: number) {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      `SELECT a.*, u.username, u.picture AS user_picture, s.name,
        (SELECT COUNT(*) FROM participation WHERE activity_id = a.id AND status = 'accepted') AS nb_participant
       FROM participation AS p
       JOIN activity AS a ON a.id = p.activity_id
       JOIN sport AS s ON s.id = a.sport_id
       JOIN user AS u ON u.id = a.user_id
       WHERE p.status = 'inviting' AND p.user_id = ?`,
      [userId],
    );
    return rows;
  }

  async editRefused(userId: number, activityId: number) {
    const [result] = await databaseClient.query(
      "UPDATE participation SET status = 'refused' WHERE user_id = ? AND activity_id = ?",
      [userId, activityId],
    );
    return result;
  }

  async editAccepted(userId: number, activityId: number) {
    const [result] = await databaseClient.query(
      "UPDATE participation SET status = 'accepted' WHERE user_id = ? AND activity_id = ?",
      [userId, activityId],
    );
    return result;
  }
}

export default new ParticipationRepository();
