const env = process.env;
const db = {
  host: env.DB_HOST || "localhost",
  user: env.DB_USER || "ecommerce",
  password: env.DB_PASSWORD || "admin",
  database: env.DB_NAME || "ecommerce",
  port: env.DB_PORT || 5432,
};

module.exports = db;
