const dotenv = require('dotenv');

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

module.exports = {
  PORT,
  MONGO_URL,
};
