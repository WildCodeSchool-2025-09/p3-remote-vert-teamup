import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class UserRepository {
  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, email FROM user WHERE email = ?",
      [email],
    );

    return rows[0] as Partial<User[]>;
  }
}

export default new UserRepository();
