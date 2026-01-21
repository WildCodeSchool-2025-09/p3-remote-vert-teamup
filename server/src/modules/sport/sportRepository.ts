import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type Sport = {
  id: number;
  name: string;
};

class SportRepository {
  async readSome(sportName: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT name FROM sport WHERE name LIKE ?",
      [`${sportName}%`],
    );

    return rows as Sport[];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT name FROM sport");

    return rows as Sport[];
  }
}

export default new SportRepository();
