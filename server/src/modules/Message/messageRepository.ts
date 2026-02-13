import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class MessageRepository {
  async create(userId: string, activityId: string, content: string) {
    const result = databaseClient.query<Result>(
      `INSERT INTO messages (user_id, activity_id, content)
        VALUES(?, ?, ?)`,
      [userId, activityId, content],
    );

    return result;
  }

  async read(userId: number, activityId: number) {
    const rows = databaseClient.query<Rows>(
      `SELECT m.*, u.username,
        FROM messages AS m
        JOIN user AS u ON m.user_id = u.id
      WHERE activity_id = ?`,
      [activityId],
    );

    return rows;
  }

  async readSigle(messageId: number) {
    const rows = databaseClient.query<Rows>(
      `SELECT m.*, u.username
        FROM messages AS m
        JOIN user AS u ON m.user_id = u.id
        WHERE m.id = ?`,
      [messageId],
    );

    return rows;
  }

  async createLike(messageId: number, userId: number) {
    const [result] = await databaseClient.query<Result>(
      `INSERT IGNORE INTO message_likes (message_id, user_id)
        VALUES (?, ?)`,
      [messageId, userId],
    );

    return { affectedRows: result.affectedRows };
  }
}

export default new MessageRepository();
