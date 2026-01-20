import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

interface ActivityInput {
  description?: string;
  address: string;
  city: string;
  zip_code: string;
  playing_at: string;
  playing_time: string;
  playing_duration: number;
  nb_spots: number;
  auto_validation: boolean;
  price?: number;
  visibility: boolean;
  level?: "beginner" | "amateur" | "advanced" | "all";
  disabled?: boolean;
  locker?: boolean;
  shower?: boolean;
  air_conditioning?: boolean;
  toilet?: boolean;
  user_id: number;
  sport_id: number;
}

class ActivityRepository {
  async create(activity: ActivityInput) {
    const [result] = await databaseClient.query(
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
      ]
    );
    return result;
  }

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
}

export default new ActivityRepository();
