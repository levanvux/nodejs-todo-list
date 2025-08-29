let data = [{ item: "get milk" }, { item: "walk dog" }, { item: "feed cat" }];

module.exports = {
  getAll: async () => data,
  create: async (todoData) => {
    data.push(todoData);
    return todoData;
  },
  update: async (id, todoData) => {
    const index = data.findIndex((todo) => todo.id === id);
    if (index === -1) return null;
    data[index] = { ...data[index], ...todoData };
    return data[index];
  },
  delete: async (item) => {
    const index = data.findIndex((todo) => todo.item === item);
    if (index === -1) return null;
    const removed = data.splice(index, 1)[0];
    return removed;
  },
};
