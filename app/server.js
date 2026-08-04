
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


// =======================
// API Routes
// =======================

// Health check
app.get("/api", (req, res) => {
  res.json({
    application: "Node Todo App",
    status: "running",
  });
});


// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});


// Add todo
app.post("/api/todos", (req, res) => {

  const todo = {
    id: Date.now(),
    task: req.body.task,
    completed: false,
  };

  todos.push(todo);

  res.status(201).json(todo);
});


// Complete todo
app.put("/api/todos/:id", (req, res) => {

  const todo = todos.find(
    t => t.id == req.params.id
  );

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found"
    });
  }

  todo.completed = true;

  res.json(todo);
});


// Delete todo
app.delete("/api/todos/:id", (req, res) => {

  todos = todos.filter(
    t => t.id != req.params.id
  );

  res.json({
    message: "Todo deleted"
  });

});



// =======================
// Web UI
// =======================

app.get("/", (req, res) => {

res.send(`

<!DOCTYPE html>

<html>

<head>

<title>Node Todo App</title>


<style>

body {

font-family: Arial;

background:#f2f2f2;

padding:40px;

}


.container {

background:white;

max-width:600px;

margin:auto;

padding:30px;

border-radius:10px;

box-shadow:0 0 10px #ccc;

}


input {

padding:10px;

width:70%;

}


button {

padding:10px;

background:#007bff;

color:white;

border:none;

cursor:pointer;

}


li {

margin:10px;

padding:10px;

background:#eee;

list-style:none;

}


.completed {

text-decoration:line-through;

color:green;

}


.delete {

background:red;

}


.complete {

background:green;

}

</style>


</head>


<body>


<div class="container">


<h1>
🚀 Node Kubernetes Todo App
</h1>


<input 
id="task"
placeholder="Enter todo"
/>


<button onclick="addTodo()">
Add
</button>


<ul id="todos"></ul>


</div>



<script>


async function loadTodos(){


const response =
await fetch('/api/todos');


const todos =
await response.json();



document.getElementById("todos").innerHTML = "";


todos.forEach(todo=>{


let li=document.createElement("li");


if(todo.completed){

li.className="completed";

}


li.innerHTML = '<span>' + todo.task + '</span><br>' +
  '<button class="complete" onclick="completeTodo(' + todo.id + ')">Complete</button>' +
  '<button class="delete" onclick="deleteTodo(' + todo.id + ')">Delete</button>';


document.getElementById("todos")
.appendChild(li);


});


}



async function addTodo(){


let task =
document.getElementById("task").value;



if(!task)
return;



await fetch('/api/todos',
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

task:task

})


});



document.getElementById("task").value="";


loadTodos();


}



async function completeTodo(id){


await fetch('/api/todos/'+id,
{

method:"PUT"

});


loadTodos();


}



async function deleteTodo(id){


await fetch('/api/todos/'+id,
{

method:"DELETE"

});


loadTodos();


}



loadTodos();


</script>


</body>

</html>


`);

});



// Start server

app.listen(3000,"0.0.0.0",()=>{

console.log(
"Todo App running on port 3000"
);

});

