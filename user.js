export class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullname() {
    return [this.firstName, this.lastName].filter(Boolean).join(' ');
  }
}

// module.exports = User;
