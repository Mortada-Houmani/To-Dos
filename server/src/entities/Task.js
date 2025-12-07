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
  },
});
