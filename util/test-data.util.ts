import { faker } from "@faker-js/faker";

export class TestDataUtil {
  /**
   * Simple generation of a German IBAN using Faker.
   * Format: DE + 2 check digits + 8 digits (BLZ) + 10 digits (account number)
   */
  static generateGermanIban(): string {
    return faker.finance.iban({ countryCode: "DE" });
  }
}
