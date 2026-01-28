import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type newUserType = {
  userId: number;
  activityId: number;
  status: string;
};

class ParticipationRepository {
  async create(newUser: newUserType) {
    const [Result] = await databaseClient.query<Result>(
      `INSERT INTO participation (status, user_id, activity_id)
        VALUES ('${newUser.status}', ${newUser.userId}, ${newUser.activityId})`,
    );

    return Result;
  }

  // Query is incorect. No i just check if user id exists in participation table but it can axist for another another activity.
  // I have to verify if user_id exists for specific activity.

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
