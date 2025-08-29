const mongoose = require("mongoose");

// const playerSchema = new mongoose.Schema({
//   name: String,
//   rank: String,
//   agent: String,
// });

const TodoSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: [true, "Please enter item field!"],
      // required: true,
      // default: "feed cat",
    },
  },
  { timestamps: true } // to add 2 fields: createdAt & updatedAt
);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
