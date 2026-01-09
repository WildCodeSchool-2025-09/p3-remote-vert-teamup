import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";

type ActivityData = {
  description: string | null;
  address: string;
  city: string;
  zip_code: string;
  playing_at: string;
  playing_duration: number;
  nb_places: number;
  auto_validation: boolean;
  price: number;
  visibility: boolean;
  level: "begginer" | "amateur" | "advance" | "All";
  disabled: boolean;
  locker: boolean;
  shower: boolean;
  air_conditioning: boolean;
  toilet: boolean;
  user_id: number;
  sport_id: number;
};

class ActivityRepository {
  async create(activityData: ActivityData) {
    const query = `
      INSERT INTO activity (
        description, address, city, zip_code,
        playing_at, playing_duration, nb_places,
        auto_validation, price, visibility,
        level, disabled, locker, shower, air_conditioning, toilet,
        user_id, sport_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      activityData.description,
      activityData.address,
      activityData.city,
      activityData.zip_code,
      activityData.playing_at,
      activityData.playing_duration,
      activityData.nb_places,
      activityData.auto_validation,
      activityData.price,
      activityData.visibility,
      activityData.level,
      activityData.disabled,
      activityData.locker,
      activityData.shower,
      activityData.air_conditioning,
      activityData.toilet,
      activityData.user_id,
      activityData.sport_id,
    ];

    const [result] = await databaseClient.query<Result>(query, values);

    return result.insertId;
  }
}

export default new ActivityRepository();
export type { ActivityData };
