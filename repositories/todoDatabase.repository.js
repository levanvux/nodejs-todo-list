const Todo = require("../models/todo.model.js");

module.exports = {
  getAll: async () => await Todo.find({}),
  create: async (todoData) => await Todo.create(todoData),
  update: async (id, todoData) => {
    await Todo.findByIdAndUpdate(id, todoData);
    return await Todo.findById(id);
  },
  delete: async (todoItem) => await Todo.findOneAndDelete({ item: todoItem }),
};
