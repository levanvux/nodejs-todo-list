const getTodos = (repo) => async (req, res) => {
  try {
    // if (req.accepts("json")) {
    //   ...;
    // }
    res.render("pages/todo", {
      title: "Todo List",
      currentPage: "todo",
      todos: await repo.getAll(),
    });
  } catch (err) {
    res.status(500).render("pages/error", {
      title: "Error",
      statusCode: 500,
      message: err.message,
      layout: false,
    });
  }
};

module.exports = {
  getTodos,
};
