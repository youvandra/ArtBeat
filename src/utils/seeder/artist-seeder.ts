import CreateDummy from "../CreateDummy";

export default class ArtistSeeder {
  async run() {
    return Promise.all(
      CreateDummy.artist(10).map((artist) => {
        return prisma.artistProfile.create({
          data: {
            ...artist,
          },
        });
      })
    );
  }
}
