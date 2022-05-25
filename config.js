module.exports = {
  PORT: process.env.PORT,
  DB: {
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.DB_NAME,
  },
  SESSION: {
    SECRET: process.env.SESSION_SECRET,
  },
  HEROKU: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
