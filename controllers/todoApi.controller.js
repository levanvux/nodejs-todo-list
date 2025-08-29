const getTodos = (repo) => async (req, res) => {
  try {
    res.json(await repo.getAll());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTodo = (repo) => async (req, res) => {
  try {
    res.status(201).json(await repo.create(req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTodo = (repo) => async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await repo.update(id, req.body);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todo);
    // res.sendStatus(204) // 204 No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTodo = (repo) => async (req, res) => {
  try {
    const { todoItem } = req.params;
    const todo = await repo.delete(todoItem.replace(/-/g, " "));
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
