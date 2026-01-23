import type { ResultSetHeader, RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ActivityRepository {
  async create(activity: ActivityForm) {
    const [result] = await databaseClient.query<ResultSetHeader>(
      `INSERT INTO activity (description, address, city, zip_code, playing_at, playing_time, playing_duration, nb_spots, auto_validation, price, visibility, level, disabled, locker, shower, air_conditioning, toilet, user_id, sport_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        activity.description ?? null,
        activity.address,
        activity.city,
        activity.zip_code,
        activity.playing_at,
        activity.playing_time,
        activity.playing_duration,
        activity.nb_spots,
        activity.auto_validation,
        activity.price ?? 0,
        activity.visibility,
        activity.level ?? "all",
        activity.disabled ?? false,
        activity.locker ?? null,
        activity.shower ?? null,
        activity.air_conditioning ?? null,
        activity.toilet ?? null,
        activity.user_id,
        activity.sport_id,
      ],
    );
    return result.insertId;
  }

  async readAll(page: number, limit: number, filters: Filters) {
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];
    let query = "";

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
      [...params, limit, offset],
    );

    const [totalResult] = await databaseClient.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_activity FROM activity AS a JOIN sport AS s ON s.id = a.sport_id ${query}`,
      params,
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
