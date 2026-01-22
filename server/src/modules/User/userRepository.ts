import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class UserRepository {
  async checkEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, email FROM user WHERE email = ?",
      [email],
    );

    return rows[0] as User[];
  }
}

export default new UserRepository();
