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

    console.log("Participation Repo:", Result);

    return Result;
  }
}

export default new ParticipationRepository();
