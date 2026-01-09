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
  sport_picture: string;
};

class ActivityRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT a.*, u.username, u.picture AS user_picture, s.name, s.picture AS sport_picture FROM activity AS a JOIN user AS u ON u.id = a.user_id JOIN sport AS s ON s.id = a.sport_id",
    );

    // Return the array of items
    return rows as CardActivity[];
  }
}

export default new ActivityRepository();
