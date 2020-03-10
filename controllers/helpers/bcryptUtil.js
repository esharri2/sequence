const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  hashPassword: async textPassword => {
    try {
      const hashedPassword = await bcrypt.hash(textPassword, saltRounds);
      return hashedPassword;
    } catch (error) {
      return error;
    }
  },
  checkPassword: async (textPassword, hash) => {
    try {
      const compare = await bcrypt.compare(textPassword, hash);
      return compare;
    } catch (error) {
      return error;
    }
  }
};
