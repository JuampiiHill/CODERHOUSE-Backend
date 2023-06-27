import userModel from "../models/user.model.js";

class UserService {
  constructor() {
    this.model = userModel;
  }

  async getAll() {
    try {
      return await this.model.find();
    } catch (err) {
      throw err;
    }
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ email: email });
    } catch (err) {
      throw err;
    }
  }

  async createUser(userData) {
    try {
      return await this.model.create(userData);
    } catch (err) {
      throw err;
    }
  }

  async getUserById(id) {
    try {
      return await this.model.findOne({_id: id });
    } catch (err) {
      throw err;
    }
  }
}

const userService = new UserService();
export default userService;
