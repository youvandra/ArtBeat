import { faker } from "@faker-js/faker";
import CreateDummy from "../CreateDummy";

export default class MuseumSeeder {
  async run() {
    const artists = await prisma.artistProfile.findMany({});

    return Promise.all(
      CreateDummy.museums(10).map(({ tokenIds, ...museum }, index) => {
        return prisma.museum.create({
          data: {
            ...museum,
            tokenIds: {
              create: {
                id: index,
                artistId: faker.helpers.arrayElement(artists).id,
              },
            },
          },
        });
      })
    );
  }
}
