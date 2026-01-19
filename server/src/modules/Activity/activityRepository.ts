import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ActivityRepository {
  async readAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const [activities] = await databaseClient.query<Rows>(
      "SELECT a.*, u.username, u.picture AS user_picture, s.name, COUNT(IF(p.status = 'accepted', 1, NULL)) AS nb_participant FROM activity AS a JOIN user AS u ON u.id = a.user_id JOIN sport AS s ON s.id = a.sport_id LEFT JOIN participation AS p ON p.activity_id = a.id GROUP BY a.id ORDER BY a.id ASC LIMIT ? OFFSET ?",
      [limit, offset],
    );

    const [totalResult] = await databaseClient.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total_activity FROM activity",
    );

    const totalActivity = totalResult[0].total_activity as number;

    return {
      activities: activities as Activity[],
      total: totalActivity,
      totalPages: Math.ceil(totalActivity / limit),
    };
  }

  async readActivitiesPublicatedByUser(userID: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select activity.*, name from activity join sport on activity.sport_id = sport.id join user on activity.user_id = user.id where user.id = ?",
      [userID],
    );

    return rows as Activity[];
  }
}

export default new ActivityRepository();
