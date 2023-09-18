import CreateDummy from "../CreateDummy";

export default class UserSeeder {
  async run() {
    const artist = await prisma.artistProfile.findMany({});
    // console.log({ artist });

    return Promise.all(
      CreateDummy.user(10).map((user, index) => {
        return prisma.user.create({
          data: {
            ...user,
            artistProfile: {
              connect: {
                id: artist[index].id,
              },
            },
          },
        });
      })
    );
  }
}
