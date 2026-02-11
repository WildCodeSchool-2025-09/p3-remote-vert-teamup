import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class userRepository {
  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT user.id, user.username, user.picture, user.password, user.email FROM user WHERE user.email = ?",
      [email],
    );

    return rows[0] as Omit<
      User,
      | "firstname"
      | "lastname"
      | "born_at"
      | "adress"
      | "city"
      | "zip_code"
      | "phone"
    >;
  }
}

export default new userRepository();
