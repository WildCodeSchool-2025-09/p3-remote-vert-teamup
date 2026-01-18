import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ActivityRepository {
  async readAll(page: number, limit: number, filters: Filters) {
    const offset = (page - 1) * limit;

    const conditions = [];
    let query = "";

    filters.name && conditions.push(`s.name = "${filters.name}"`);
    filters.city && conditions.push(`a.city = "${filters.city}"`);
    filters.playingAt &&
      conditions.push(`a.playing_at = "${filters.playingAt}"`);

    if (conditions.length > 0) {
      query += `WHERE ${conditions.join(" AND ")}`;
    }

    const [activities] = await databaseClient.query<Rows>(
      `SELECT a.*, u.username, u.picture AS user_picture, s.name, 
      COUNT(IF(p.status = 'accepted', 1, NULL)) AS nb_participant 
      FROM activity AS a JOIN user AS u ON u.id = a.user_id 
      JOIN sport AS s ON s.id = a.sport_id 
      LEFT JOIN participation AS p ON p.activity_id = a.id 
      ${query}
      GROUP BY a.id ORDER BY a.id ASC LIMIT ? OFFSET ?`,
      [limit, offset],
    );

    const [totalResult] = await databaseClient.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_activity FROM activity AS a JOIN sport AS s ON s.id = a.sport_id ${query}`,
    );

    const totalActivities = totalResult[0].total_activity as number;

    return {
      activities: activities as Activity[],
      totalActivities: totalActivities,
      totalPages: Math.ceil(totalActivities / limit),
    };
  }
}

export default new ActivityRepository();
