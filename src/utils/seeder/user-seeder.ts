import { User } from "@prisma/client";
import CreateDummy from "../CreateDummy";

export default class UserSeeder {
  async run() {
    return Promise.all(
      CreateDummy.user(10, ["admin", "collector", "curator"]).map(
        (user, index) => {
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

          return prisma.user.create({
            data: {
              ...user,
            },
          });
        }
      )
    );
  }
}
