
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Task",
  tableName: "tasks",
  columns: {
    id: {
      primary: true,
      type: "integer",
      generated: "increment",
    },
    text: {
      type: "text",
    },
    completed: {
      type: "boolean",
      default: false,
    },
    user_id: {
      type: "integer",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "user_id",  
      },
      inverseSide: "tasks",  
    },
  },
});
