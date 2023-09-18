import CreateDummy from "../CreateDummy";

export default class MuseumSeeder {
  async run() {
    return Promise.all(
      CreateDummy.museums(10).map(({ tokenIds, ...museum }) => {
        return prisma.museum.create({
          data: {
            ...museum,
          },
        });
      })
    );
  }
}
