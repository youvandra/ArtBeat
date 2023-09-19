import { prisma } from "../../server/db/client";
import ArtistSeeder from "./artist-seeder";
import AwardSeeder from "./award-seeder";
import EventSeeder from "./event-seeder";
import MuseumSeeder from "./museum-seeder";
import UserSeeder from "./user-seeder";

export class Seed {
  protected seeder = "Seed";

  protected async run(): Promise<unknown> {
    throw Error(`[LogicError]: ${this.seeder}.run is not a valid method!`);
  }
}

class Seeder {
  static seeders = [
    new ArtistSeeder(),
    new MuseumSeeder(),
    new UserSeeder(),
    new AwardSeeder(),
    new EventSeeder(),
  ];

  static async seed() {
    try {
      for (let i = 0; i < this.seeders.length; i++) {
        await this.seeders[i].run();
      }
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
      process.exit(0);
    }
  }
}

Seeder.seed();
