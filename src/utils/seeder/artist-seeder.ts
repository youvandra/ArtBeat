import CreateDummy from "../CreateDummy";

export default class ArtistSeeder {
  async run() {
    return Promise.all(
      CreateDummy.artist(4).map(({ id, ...artist }) => {
        const { id: userId, ...user } = CreateDummy.user(1, ["artist"]).at(0);
        return prisma.artistProfile.create({
          data: {
            ...artist,
            user: {
              create: {
                ...user,
              },
            },
          },
        });
      })
    );
  }
}
