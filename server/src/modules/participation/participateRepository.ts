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
}

export default new ParticipationRepository();
