import { Activity, Client } from "@/types/client";
import { faker } from "@faker-js/faker";

faker.seed(123);

export function generateClient(): Client {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "national" }),
    createdAt: faker.date.past({ years: 2 }),
    tags: faker.helpers.arrayElements(
      ["Prospect", "Client", "VIP", "À relancer", "Partenaire", "Newsletter"],
      {
        min: 0,
        max: 2,
      }
    ),
    activityHistory: generateActivities(),
  };
}

export function generateClients(count: number = 500): Client[] {
  return Array.from({ length: count }, generateClient);
}

export function generateActivity(): Activity {
  return {
    date: faker.date.recent({ days: 30 }),
    description: faker.lorem.sentence({min: 20,max: 100}),
  };
}

export function generateActivities(): Activity[] {
  const count = faker.number.int({ min: 1, max: 10 });
  return Array.from({ length: count }, generateActivity);
}
