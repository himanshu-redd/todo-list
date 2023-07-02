const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

const port = 3000;
app.listen(port, () => console.log("Listening on : " + port));
app.use(bodyParser.json());
app.use(cors());

app.post("/todos", saveTodo);
app.get("/todos", getAllTodos);
app.delete("/todos/:id", deleteTodo);
let todoList = [];
let id = 0;

function saveTodo(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const body = {
        id: ++id,
        title: title,
        description: description
    }
    todoList.push(body);
    const response = {id : id}; 
    res.status(200).send(body); 
}

function getAllTodos(req, res) {
    if (todoList.length > 0) {
        res.status(200).send(todoList);
    } else {
        res.status(400).send({message : "No todo found"}); 
    }
}

function deleteTodo(req, res){
    const id = req.params.id; 
    let tempArray = []; 
    todoList.forEach((todo) => {
        if (todo.id != id)
            tempArray.push(todo); 
    }); 
    todoList = tempArray; 
    res.status(200).send(todoList);  
}