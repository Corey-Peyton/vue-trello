const userService = require("../../service/user/userService");
const HTTP = require("../../config/HTTP");

/**
 * @class UserController
 */
class UserController {
  /**
   * @constructor
   * @param {Object} service Service class
   */
  constructor(service) {
    this.service = service;

    /**
     * User route
     */
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // ///////////////////////////////////
  //        User
  // ///////////////////////////////////

  /**
   * Controller for login action
   * @param {Object} req Request
   * @param {Object} res Response
   * @param {Object} next Lunch next action
   */
  async login(req, res, next) {
    if (req.isAuthenticated()) {
      return res.status(HTTP.OK).send();
    }
    return next();
  }

  /**
   * Controller for register action
   * @param {Object} req Request
   * @param {Object} res Response
   */
  async register(req, res) {
    const result = await this.service.register(req.body);
    return res.status(result.statusCode).send(result.data);
  }

  /**
   * Controller for get action
   * @param {Object} req Request
   * @param {Object} res Response
   */
  async getAll(_req, res) {
    const result = await this.service.getAll();
    return res.status(result.statusCode).send(result.data);
  }

  /**
   * Controller for get action
   * @param {Object} req Request
   * @param {Object} res Response
   */
  async getOne(req, res) {
    const result = await this.service.getOne(req.params.username);
    return res.status(result.statusCode).send(result.data);
  }

  /**
   * Controller for update action
   * @param {Object} req Request
   * @param {Object} res Response
   */
  async update(req, res) {
    const result = await this.service.update(req.params.username, req.body);
    return res.status(result.statusCode).send(result.data);
  }

  /**
   * Controller for updatePassword action
   * @param {Object} req Request
   * @param {Object} res Response
   */
  async updatePassword(req, res) {
    const result = await this.service.updatePassword(
      req.params.username,
      req.body.password
    );
    return res.status(result.statusCode).send(result.data);
  }

  /**
   * Controller for delete action
   * @param {Object} req Request
   * @param {Object} res Response
   */
  async delete(req, res) {
    const result = await this.service.delete(req.params.username);
    if (result.statusCode === HTTP.OK) res.clearCookie("connect.sid");
    return res.status(result.statusCode).send(result.data);
  }
}

module.exports = new UserController(userService);
