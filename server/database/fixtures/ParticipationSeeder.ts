import AbstractSeeder from "./AbstractSeeder";
import ActivitySeeder from "./ActivitySeeder";
import UserSeeder from "./UserSeeder";

class ParticipationSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "participation",
      truncate: true,
      dependencies: [UserSeeder, ActivitySeeder],
    });
  }

  run() {
    const randomUser = Math.floor(Math.random() * 10);
    const statusArray = ["inviting", "accepted", "refused"];

    for (let i = 0; i < 10; i += 1) {
      const fakeUser = {
        user_id: this.getRef(`user_${randomUser}`).insertId,
        activity_id: this.getRef(`activity_${i}`).insertId,
        status: statusArray[Math.floor(statusArray.length * Math.random())],
        created_at: this.faker.date.soon(),
        updated_at: this.faker.date.future(),
      };

      this.insert(fakeUser);
    }
  }
}

export default ParticipationSeeder;
