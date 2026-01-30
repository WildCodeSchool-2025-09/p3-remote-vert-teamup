import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type newUserType = {
  userId: number;
  activityId: number;
  status: string;
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

  async validate(userId: number, activityId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM participation WHERE user_id = ? AND activity_id = ?",
      [userId, activityId],
    );
    return rows as Participant[];
  }

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
}

export default new participationRepository();
