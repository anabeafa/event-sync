export class User {
  constructor({ id, name, email, passwordHash, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt || new Date();
  }

  static create(data) {
    if (!data.name || !data.email || !data.passwordHash) {
      throw new Error("Missing required fields");
    }

    return new User(data);
  }
}
