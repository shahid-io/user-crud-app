import dotenv from "dotenv";
dotenv.config();

const ServerConfig = {
  PORT: process.env.PORT,
};

export { ServerConfig };
