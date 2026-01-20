import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class UserRepository {
  async checkUsername(username: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT username FROM user WHERE username = ?",
      [username],
    );

    return rows[0];
  }
}

export default new UserRepository();
