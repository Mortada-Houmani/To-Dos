// User.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "integer",
      generated: "increment",
    },
    email: {
      type: "text",
      unique: true,
    },
    fullName: {
      type: "text",
    },
    password: {
      type: "text",
    },
  },
  relations: {
    tasks: {
      type: "one-to-many",
      target: "Task",
      inverseSide: "user",
      cascade: true,     
    },
  },
});
