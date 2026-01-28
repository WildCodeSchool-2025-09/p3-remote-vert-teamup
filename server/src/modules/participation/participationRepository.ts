import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

class ParticipationRepository {
  async readAll(userId: number) {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      `SELECT p.*, a.*, s.name AS sport_name
       FROM participation AS p
       JOIN activity AS a ON a.id = p.activity_id
       JOIN sport AS s ON s.id = a.sport_id
       WHERE p.status = 'inviting' AND p.user_id = ?`,
      [userId],
    );
    return rows;
  }
}

export default new ParticipationRepository();
