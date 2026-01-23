import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

class SportRepository {
  async readSome(sportName: string) {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      "SELECT id, name FROM sport WHERE name LIKE ?",
      [`${sportName}%`],
    );
    return rows as Sport[];
  }

  async readAll() {
    const query = "SELECT id, name FROM sport ORDER BY name";
    const [rows] = await databaseClient.query<RowDataPacket[]>(query);
    return rows as Sport[];
  }
}

export default new SportRepository();
