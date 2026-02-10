import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type newUserType = {
  userId?: number;
  activityId?: number;
  status?: string;
};

class participationRepository {
  async readAllParticipants(activityId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT participation.id, participation.status, user.id as userId, user.username, user.picture FROM participation
      JOIN user ON participation.user_id = user.id
      WHERE participation.activity_id = ?
      ORDER BY FIELD(participation.status, 'request', 'accepted', 'inviting', 'refused')`,
      [activityId],
    );

    return rows as Participant[];
  }

  async patch(id: number, status: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE participation SET status = ? WHERE participation.id = ?",
      [status, id],
    );
    return result.affectedRows;
  }

  async create(newParticipant: newUserType) {
    const [Result] = await databaseClient.query<Result>(
      `INSERT INTO participation (status, user_id, activity_id)
        VALUES ('${newParticipant.status}', ${newParticipant.userId}, ${newParticipant.activityId})`,
    );

    return Result;
  }

  async readUserActity(userId: number) {
    console.log(userId);
    const [rows] = await databaseClient.query<Rows>(
      `SELECT a.id, a.playing_at, a.city, s.name AS sport_name, p.status 
        FROM participation AS p
        JOIN activity AS a ON a.id = p.activity_id
        JOIN sport AS s ON s.id = a.sport_id
        WHERE p.user_id = ?
        AND p.status = 'accepted'
        ORDER BY playing_at ASC`,
      [userId],
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

export default new participationRepository();
