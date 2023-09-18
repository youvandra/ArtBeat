import { faker } from "@faker-js/faker";
import { ArtistProfile, Museum, TokenId } from "@prisma/client";

export default class CreateDummy {
  static museums(total: number = 10): (Museum & { tokenIds: TokenId[] })[] {
    return [...Array(total)].map(() => ({
      id: faker.string.uuid(),
      address: faker.location.streetAddress(),
      description: faker.lorem.paragraphs(10),
      mainImage: "/detail-minting-1.jpg",
      image1: "/detail-minting-1.jpg",
      image2: "/detail-minting-1.jpg",
      name: faker.company.name(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      tokenIds: [...Array(3)].map(
        (): TokenId => ({
          id: faker.number.int({ min: 1, max: 3 }),
          artistId: faker.string.uuid(),
          museumId: faker.string.uuid(),
        })
      ),
    }));
  }

  static artist(total: number = 10): ArtistProfile[] {
    return [...Array(total)].map(() => ({
      id: faker.string.uuid(),
      description: faker.lorem.sentence(),
      facebook: faker.internet.url(),
      instagram: faker.internet.url(),
      twitter: faker.internet.url(),
      followers: faker.number.int({ min: 0, max: 1000000000000 }),
    }));
  }
}
