import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

class MailRepository {
  async getInvitationData(userId: number, activityId: number) {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      `SELECT u.email, u.username, s.name AS activity_name
       FROM user AS u, activity AS a, sport AS s
       WHERE u.id = ? AND a.id = ? AND s.id = a.sport_id`,
      [userId, activityId],
    );
    return rows[0];
  }
}

export default new MailRepository();
