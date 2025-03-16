import dotenv from "dotenv";
dotenv.config();
export const envVariables = {
  PORT: process.env.PORT || 4035,
  SQL_DRIVE: process.env.SQL_DRIVE,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};
