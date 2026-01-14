import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";

class ActivitySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "activity", truncate: true, dependencies: [UserSeeder] });
  }

  run() {
    const levels = ["begginer", "amateur", "advance", "All"];
    const randomUser = Math.floor(Math.random() * 10);
    const city = [
      "Paris",
      "Bordeaux",
      "Lille",
      "Lyon",
      "Marseille",
      "Toulouse",
      "Strasbourg",
    ];

    for (let i = 0; i < 20; i += 1) {
      const fakeUser = {
        address: this.faker.location.streetAddress(),
        city: this.faker.helpers.arrayElement(city),
        description: this.faker.lorem.words(10),
        zip_code: this.faker.location.zipCode("#####"),
        playing_at: this.faker.date.future(),
        playing_duration: this.faker.number.int({ min: 20, max: 180 }),
        nb_places: this.faker.number.int({ min: 0, max: 22 }),
        auto_validation: this.faker.datatype.boolean(),
        price: this.faker.datatype.boolean({ probability: 0.3 })
          ? this.faker.number.int({ min: 1, max: 30 })
          : 0,
        visibility: this.faker.datatype.boolean(),
        user_id: this.getRef(`user_${randomUser}`).insertId,
        sport_id: this.faker.number.int({ min: 1, max: 26 }),
        level: this.faker.helpers.arrayElement(levels),
        disabled: this.faker.datatype.boolean(),
        locker: this.faker.datatype.boolean(),
        shower: this.faker.datatype.boolean(),
        air_conditioning: this.faker.datatype.boolean(),
        toilet: this.faker.datatype.boolean(),
        refName: `activity_${i}`,
      };

      this.insert(fakeUser);
    }
  }
}

export default ActivitySeeder;
