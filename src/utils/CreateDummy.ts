import { faker } from "@faker-js/faker";
import {
  ArtistProfile,
  Event,
  Museum,
  Role,
  TokenId,
  User,
} from "@prisma/client";

export default class CreateDummy {
  static museums(total: number = 10): (Museum & { tokenIds: TokenId[] })[] {
    return [...Array(total)].map(() => ({
      id: faker.string.uuid(),
      address: faker.location.streetAddress(),
      description: faker.lorem.paragraphs(10),
      mainImage: "/detail-minting-1.jpg",
      image1: "/detail-minting-2.jpg",
      image2: "/detail-minting-3.jpg",
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
      followers: faker.number.int({ min: 0, max: 100000 }),
    }));
  }

  static user(total: number = 10): User[] {
    return [...Array(total)].map(() => ({
      id: faker.string.uuid(),
      email: faker.internet.email(),
      emailVerified: faker.date.past(),
      image: "https://placehold.co/200x200",
      name: faker.person.fullName(),
      password: faker.string.binary(),
      role: faker.helpers.arrayElement(Object.values(Role)),
    }));
  }

  static event(total: number = 10): Event[] {
    return [...Array(total)].map(() => ({
      id: faker.string.uuid(),
      address: faker.location.streetAddress(),
      date: faker.date.future().toDateString(),
      description: faker.lorem.lines(),
      mainImage: "/detail-minting-1.jpg",
      image1: "/detail-minting-2.jpg",
      image2: "/detail-minting-3.jpg",
      name: faker.lorem.words(),
      time: faker.date.soon().toISOString(),
      ticketPrice: parseInt(faker.finance.amount()),
    }));
  }
}
