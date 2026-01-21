import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class userRepository {
  async readAllParticipants(activityId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT user.username, user.picture, demand.status FROM user 
      JOIN demand ON user.id = demand.user_id
      WHERE demand.activity_id = ?
      UNION
      SELECT user.username, user.picture, participation.status FROM user 
      JOIN participation ON user.id = participation.user_id
      WHERE participation.activity_id = ?`,
      [activityId, activityId],
    );

    return rows as Participant[];
  }
}

export default new userRepository();
