import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type CardActivity = {
  id: number;
  address: string;
  city: string;
  zip_code: string;
  description: string;
  playing_at: string;
  playing_time: string;
  playing_duration: number;
  nb_places: number;
  auto_validation: boolean;
  price: string;
  visibility: boolean;
  level: string;
  disabled: boolean;
  locker: boolean;
  shower: boolean;
  air_conditioning: boolean;
  toilet: boolean;
  user_id: number;
  sport_id: number;
  username: string;
  user_picture: string;
  name: string;
  nb_participant: number;
};

class ActivityRepository {
  async readAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT a.*, u.username, u.picture AS user_picture, s.name, COUNT(IF(p.status = 'accepted', 1, NULL)) AS nb_participant FROM activity AS a JOIN user AS u ON u.id = a.user_id JOIN sport AS s ON s.id = a.sport_id LEFT JOIN participation AS p ON p.activity_id = a.id GROUP BY a.id ORDER BY a.id ASC LIMIT ? OFFSET ?",
      [limit, offset],
    );

    const [totalResult] = await databaseClient.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total_activity FROM activity",
    );

    const totalActivity = totalResult[0].total_activity as number;

    // Return the array of items
    return {
      rows: rows as CardActivity[],
      total: totalActivity,
      totalPages: Math.ceil(totalActivity / limit),
    };
  }
}

export default new ActivityRepository();
