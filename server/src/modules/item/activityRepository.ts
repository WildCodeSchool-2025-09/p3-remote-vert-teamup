import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Item = {
  id: number;
  title: string;
  user_id: number;
};

class ItemRepository {
  async readAll(userId: number) {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from activity INNER JOIN participation ON participation.activity_id = activity.id WHERE participation.user_id = ? AND activity.playing_at >= CURDATE() ORDER BY activity.playing_at ASC",
      [userId],
    );
    return rows as Item[];
  }
}

export default new ItemRepository();
