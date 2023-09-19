import { User } from "@prisma/client";
import CreateDummy from "../CreateDummy";

export default class UserSeeder {
  async run() {
    const artist = await prisma.artistProfile.findMany({});

    return Promise.all(
      CreateDummy.user(10).map((user, index) => {
        const admin: User = {
          ...user,
          email: "admin@gmail.com",
          role: "admin",
          password: "admin",
        };

        if (index == 0) {
          return prisma.user.create({
            data: {
              ...admin,
            },
          });
        }

        if (index > 7) {
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
        }

        return prisma.user.create({
          data: {
            ...user,
          },
        });
      })
    );
  }
}
