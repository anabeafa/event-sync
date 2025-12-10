export class InMemoryUserRepository {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  async create(userData) {
    const newUser = {
      id: this.nextId++,
      ...userData,
    };

    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email) {
    return this.users.find((u) => u.email === email) || null;
  }
}
