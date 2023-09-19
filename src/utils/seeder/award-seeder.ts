import { faker } from "@faker-js/faker";

export default class AwardSeeder {
  async run() {
    const artist = await prisma.artistProfile.findMany({});

    return Promise.all(
      artist.map((artist) => {
        return prisma.award.create({
          data: {
            name: faker.lorem.words({ min: 3, max: 10 }),
            artist: {
              connect: {
                id: artist.id,
              },
            },
          },
        });
      })
    );
  }
}
