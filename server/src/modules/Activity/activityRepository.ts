import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Filters = {
  locker: boolean;
  shower: boolean;
  toilet: boolean;
  air_conditioning: boolean;
  level: string | null;
  price: number | null;
  disabled: boolean;
};

class ItemRepository {
  async readAll(filters: Filters) {
    const { locker, shower, toilet, air_conditioning, level, price, disabled } =
      filters;

    const [rows] = await databaseClient.query<Rows>(
      `
        SELECT * FROM activity
        WHERE 
        (? = 0 OR locker = 1)
        AND (? = 0 OR shower = 1)
        AND (? = 0 OR toilet = 1)
        AND (? = 0 OR air_conditioning = 1)
        AND (? IS NULL OR level = ?)
        AND (? IS NULL OR price <= ?)
        AND (? = 0 OR disabled = 1)
        `,
      [
        locker ? 1 : 0,
        shower ? 1 : 0,
        toilet ? 1 : 0,
        air_conditioning ? 1 : 0,
        level,
        level,
        price,
        price,
        disabled ? 1 : 0,
      ],
    );

    return rows;
  }
}

export default new ItemRepository();
