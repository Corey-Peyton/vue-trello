const request = require("supertest");
const app = require("../../../src/app");
const db = require("../../../src/loader/sequelize");
const {
  defaultUser,
  createDefaultUser,
} = require("../../tools/user_generator");

const agent = request.agent(app);
const agentNotLogin = request.agent(app);

describe("Tests - Functional - User", () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await db.sequelize.sync({ force: true });
    await createDefaultUser(db);
  });

  // eslint-disable-next-line no-undef
  after(async () => {
    await db.sequelize.drop();
  });

  //* LOGIN *//

  describe("Login", () => {
    it("Login failure (Wrong Username)", (done) => {
      agent
        .post("/users/login")
        .send({
          username: "WrongUsername",
          password: "password",
        })
        .expect(302)
        .expect("Location", "/users/login/failure")
        .end(done);
    });

    it("Login failure (Wrong password)", (done) => {
      agent
        .post("/users/login")
        .send({
          username: "Armandirow",
          password: "WrongPassword",
        })
        .expect(302)
        .expect("Location", "/users/login/failure")
        .end(done);
    });

    it("Login failure (Empty body)", (done) => {
      agent
        .post("/users/login")
        .send()
        .expect(302)
        .expect("Location", "/users/login/failure")
        .end(done);
    });

    it("Login success", (done) => {
      agent
        .post("/users/login")
        .send({
          username: "Armandirow",
          password: "password",
        })
        .expect(302)
        .expect("Location", "/users/login/success")
        .end(done);
    });
  });

  //* REGISTER *//

  describe("Register", () => {
    it("Register Success -> (201)", (done) => {
      agent
        .post("/users/register")
        .send({
          username: "Tester",
          firstname: "Test",
          lastname: "tester",
          email: "test.test@gmail.com",
          password: "test",
        })
        .expect(201)
        .end(done);
    });
  });
});
