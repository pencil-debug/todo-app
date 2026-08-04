const express = require("express");

const app = express();

app.use(express.json());

let todos = [
  {
    id: 1,
    task: "Learn Kubernetes",
    completed: false,
  },
];

app.get("/", (req, res) => {
  res.json({
    application: "Node Todo App",
    status: "running",
  });
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
  };

  todos.push(todo);

  res.status(201).json(todo);
});

module.exports = app;

app.listen(3000, "0.0.0.0", () => {
  console.log("Todo app running on port 3000");
});
