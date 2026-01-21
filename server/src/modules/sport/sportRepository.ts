import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

interface Sport extends RowDataPacket {
  id: number;
  name: string;
}

class SportRepository {
  async readSome(sportName: string) {
    const [rows] = await databaseClient.query<Sport[]>(
      "SELECT id, name FROM sport WHERE name LIKE ?",
      [`${sportName}%`],
    );
    return rows;
  }

  async readAll() {
    const query = "SELECT id, name FROM sport ORDER BY name";
    const [rows] = await databaseClient.query<Sport[]>(query);
    return rows;
  }
}

export default new SportRepository();
export type { Sport };
