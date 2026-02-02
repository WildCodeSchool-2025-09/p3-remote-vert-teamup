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
}

export default new ParticipationRepository();
