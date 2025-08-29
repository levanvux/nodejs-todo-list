const express = require("express");

module.exports = (repo) => {
  const router = express.Router();
  const { getTodos } = require("../controllers/todoView.controller.js");

  router.get("/", getTodos(repo));

  return router;
};
