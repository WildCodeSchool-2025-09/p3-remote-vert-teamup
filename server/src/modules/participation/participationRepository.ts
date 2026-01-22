import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";

class ParticipationRepository {
  async create(guestId: number, activityId: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO participation (status, user_id, activity_id) VALUES ('inviting', ?, ?)",
      [guestId, activityId],
    );

    return result;
  }
}

export default new ParticipationRepository();
