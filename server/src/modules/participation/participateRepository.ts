import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class ParticipationRepository {
  async create(userId: number, activityId: number) {
    const [Result] = await databaseClient.query<Result>(
      `INSERT INTO participation (status, user_id, activity_id)
        VALUES ('accepted', ${userId}, ${activityId})`,
    );

    console.log("From Participate REPO:", Result);

    return Result;
  }
}

export default new ParticipationRepository();
