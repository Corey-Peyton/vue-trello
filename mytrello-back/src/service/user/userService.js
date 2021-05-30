const bcrypt = require("bcrypt");
const db = require("../../loader/sequelize");
const HTTP = require("../../config/HTTP");

const { getAllUsers, getUserById, getUserByUsername } = require("./getUser");

/**
 * @class UserService
 */
class UserService {
  /**
   * @constructor
   */
  constructor() {
    this.register = this.register.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.delete = this.delete.bind(this);
  }

  async register(newUser) {
    try {
      /* Create new user */
      const userCreated = await db.user.create(
        {
          ...newUser,
          password: await bcrypt.hash(newUser.password, 10),
        },
        {
          include: [
            {
              model: db.user_setting,
            },
          ],
        }
      );
      if (userCreated === null) {
        return {
          statusCode: HTTP.BadRequest,
          data: "[User] Failed to create user",
        };
      }

      /* Create new user setting */
      await userCreated.createUser_setting();

      /* Save new user */
      userCreated.save();

      return {
        statusCode: HTTP.Created,
        data: await getUserById(userCreated.id),
      };
    } catch (err) {
      console.log("[User|Register]: ", err);
      return { statusCode: HTTP.InternalServerError, data: err };
    }
  }

  /**
   * Get all the users to the database
   */
  async getAll() {
    try {
      /* Get All the user in the database */
      const users = await getAllUsers();

      if (users == null) {
        return {
          statusCode: HTTP.NoContent,
          data: "User not found",
        };
      }
      return { statusCode: HTTP.OK, data: users };
    } catch (err) {
      console.log("[User|GetAll]: ", err);
      return { statusCode: HTTP.InternalServerError, data: err };
    }
  }

  /**
   * Get on user in the database
   */
  async getOne(username) {
    try {
      /* Get One user in the database */
      const user = await getUserByUsername(username);

      /* User not found */
      if (user === null)
        return { statusCode: HTTP.NotFound, data: "User not found" };

      return { statusCode: HTTP.OK, data: user };
    } catch (err) {
      console.log("[User|GetOne]: ", err);
      return { statusCode: HTTP.InternalServerError, data: err };
    }
  }

  /**
   * Update user in database
   */
  async update(username, updateUser) {
    try {
      /* Get user to update */
      const userToUpdate = await getUserByUsername(username);
      if (userToUpdate === null) {
        return {
          statusCode: HTTP.NoContent,
          data: "User not found",
        };
      }

      /* Update the user */
      await userToUpdate.update({
        ...updateUser,
        password: userToUpdate.password,
      });

      return { statusCode: HTTP.OK, data: userToUpdate.get() };
    } catch (err) {
      console.log("[User|Update]: ", err);
      return { statusCode: HTTP.InternalServerError, data: err };
    }
  }

  /**
   * Update user in database
   */
  async updatePassword(username, newPassword) {
    try {
      /* Get user to update */
      const userToUpdate = await getUserByUsername(username);
      if (userToUpdate === null) {
        return {
          statusCode: HTTP.NoContent,
          data: "User not found",
        };
      }

      /* Update the user */
      await userToUpdate.update({
        password: await bcrypt.hash(newPassword, 10),
      });

      return { statusCode: HTTP.OK, data: userToUpdate.get() };
    } catch (err) {
      console.log("[User|Update]: ", err);
      return { statusCode: HTTP.InternalServerError, data: err };
    }
  }

  /**
   * Delete user in database
   */
  async delete(username) {
    try {
      /* Get user to update */
      const userToDelete = await getUserByUsername(username);
      if (userToDelete === null) {
        return {
          statusCode: HTTP.NotFound,
          data: "User Not Found",
        };
      }

      await userToDelete.destroy();
      return { statusCode: HTTP.OK, data: "User deleted" };
    } catch (err) {
      console.log("[User|Delete]: ", err);
      return { statusCode: HTTP.InternalServerError, data: err };
    }
  }
}

module.exports = new UserService();
