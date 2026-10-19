class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullname() {
    return `${firstName} ${lastName}`;
  }
}

module.exports = User;
