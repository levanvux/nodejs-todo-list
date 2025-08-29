const express = require("express");

module.exports = (repo) => {
  const router = express.Router();
  const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  } = require("../controllers/todoApi.controller.js");

  router.get("/", getTodos(repo));

  router.post("/", createTodo(repo));

  router.put("/:id", updateTodo(repo));

  router.delete("/:todoItem", deleteTodo(repo));

  return router;
};
