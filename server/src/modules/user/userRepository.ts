import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class userRepository {
  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT user.id, user.username, user.picture, user.email FROM user WHERE user.email = ?",
      [email],
    );

    return rows[0] as Partial<User>;
  }
}

export default new userRepository();
