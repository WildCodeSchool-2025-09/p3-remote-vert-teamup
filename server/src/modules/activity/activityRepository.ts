import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type Activity = {
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
};

class ActivityRepository {
  async readSome(sportName: string, sportCity: string, sportDate: string) {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select activity.*, name from activity join sport on activity.sport_id = sport.id where name = ? and city = ? and playing_at like ?",
      [sportName, sportCity, `${sportDate}%`],
    );

    // Return the array of items
    return rows as Activity[];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select activity.*, name from activity join sport on activity.sport_id = sport.id",
    );

    // Return the array of items
    return rows as Activity[];
  }
}

export default new ActivityRepository();
