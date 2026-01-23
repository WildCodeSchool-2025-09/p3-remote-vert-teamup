import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class userRepository {
  async readUserbyEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT user.id, user.username, user.picture FROM user WHERE user.email = ?",
      [email],
    );

    return rows[0] as User;
  }
}

export default new userRepository();
