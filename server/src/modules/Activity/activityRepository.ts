import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ActivityRepository {
  async readAll(
    page: number,
    limit: number,
    filters: Filters,
    userId?: number,
  ) {
    // console.log("USER ID FROM REPOSItoRu", userId);
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];

    if (filters.sport) {
      conditions.push("s.name = ?");
      params.push(filters.sport);
    }
    if (filters.city) {
      conditions.push("a.city = ?");
      params.push(filters.city);
    }
    if (filters.playingAt) {
      conditions.push("a.playing_at = ?");
      params.push(filters.playingAt);
    }

    filters.locker && conditions.push("a.locker = 1");
    filters.shower && conditions.push("a.shower = 1");
    filters.toilet && conditions.push("a.toilet = 1");
    filters.air_conditioning && conditions.push("a.air_conditioning = 1");

    if (filters.level) {
      conditions.push("(a.level IS NULL OR a.level = ?)");
      params.push(filters.level);
    }
    if (filters.price !== null && filters.price !== undefined) {
      conditions.push("(a.price IS NULL OR a.price <= ?)");
      params.push(filters.price);
    }

    filters.disabled && conditions.push("a.disabled = 1");

    const query =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const [activities] = await databaseClient.query<Rows>(
      `SELECT a.*, u.username, u.picture AS user_picture, s.name${userId ? ", up.status AS user_status" : ""},
      COUNT(IF(p.status = 'accepted', 1, NULL)) AS nb_participant 
      FROM activity AS a JOIN user AS u ON u.id = a.user_id 
      JOIN sport AS s ON s.id = a.sport_id 
      LEFT JOIN participation AS p ON p.activity_id = a.id
      ${userId ? "LEFT JOIN participation AS up ON up.activity_id = a.id AND up.user_id = ?" : ""}
      ${query}
      GROUP BY a.id ${userId ? ", up.status" : ""} ORDER BY a.id ASC LIMIT ? OFFSET ?`,
      userId ? [userId, ...params, limit, offset] : [...params, limit, offset],
    );

    const [totalResult] = await databaseClient.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_activity FROM activity AS a JOIN sport AS s ON s.id = a.sport_id 
      ${userId ? "LEFT JOIN participation AS p ON p.activity_id = a.id AND p.user_id = ?" : ""}
      ${query}`,
      userId ? [userId, ...params] : [...params],
    );

    const totalActivities = totalResult[0].total_activity as number;

    console.log("Repo Activities", activities);

    return {
      activities: activities as Activity[],
      totalActivities: totalActivities,
      totalPages: Math.ceil(totalActivities / limit),
    };
  }
}

export default new ActivityRepository();
