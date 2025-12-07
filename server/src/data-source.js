const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "tasks.db",
  synchronize: true,
  logging: true,
  entities: [__dirname + "/entities/*.js"],
});

module.exports = { AppDataSource };
