import CreateDummy from "../CreateDummy";

export default class EventSeeder {
  async run() {
    return Promise.all(
      CreateDummy.event().map((event) => {
        return prisma.event.create({
          data: {
            ...event,
          },
        });
      })
    );
  }
}
