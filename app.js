const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const { exec } = require("child_process");
const mongoose = require("mongoose");

const todoViewRoute = require("./routes/todoView.route.js");
const todoApiRoute = require("./routes/todoApi.route.js");
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// repositories
const databaseRepo = require("./repositories/todoDatabase.repository.js");
const memoryRepo = require("./repositories/todoMemory.repository.js");
const repo = process.env.DATABASE_URL ? databaseRepo : memoryRepo;

// listening port
const PORT = process.env.PORT ?? 3333;

const startServer = function () {
  app.listen(PORT, () => {
    console.log("app running on port " + PORT);
    // exec(
    //   `${
    //     process.platform === "win32"
    //       ? "start "
    //       : process.platform === "darwin"
    //       ? "open "
    //       : "xdg-open "
    //   } http://localhost:${PORT}`,
    //   (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //
    //     console.log(`App is available at http://localhost:${PORT}`);
    //   }
    // );
  });

  // index route
  app.get("/", (req, res) => {
    res.render("pages/home", { title: "Home Todo" });
  });

  // routes
  app.use("/todo", todoViewRoute(repo));
  app.use("/api/todo", todoApiRoute(repo));

  app.use((req, res) => {
    res.status(404).render("pages/error", {
      title: "Page Not Found",
      statusCode: 404,
      message: "The page you are looking for does not exist.",
      layout: false,
    });
  });

  // 500 handler (error handler middleware)
  app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).render("pages/error", {
      title: "Server Error",
      statusCode: 500,
      message: "Something went wrong!",
      layout: false,
    });
  });
};

if (process.env.DATABASE_URL) {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => startServer())
    .catch((err) => {
      console.error("Connection failed:", err.message);
    });
} else {
  startServer();
}

// MVC architecture
// Model = data // eg: todos, users...
// View = template files // eg: todo.ejs, account.ejs...
// Controller = control the app sections // todoController, userController...
// Model <--> Controller <--> View
