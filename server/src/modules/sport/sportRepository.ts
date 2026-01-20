import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type Sport = {
  id: number;
  name: string;
};

class SportRepository {
  async readSome(sportName: string) {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select name from sport where name like ?",
      [`${sportName}%`],
    );

    // Return the array of items
    return rows as Sport[];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select name from sport");

    // Return the array of items
    return rows as Sport[];
  }
}

export default new SportRepository();
