const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// MiddleWares
app.use(cors());
app.use(express.json());

// Routes
app.get('/todos', async(req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todo");
        res.json(todos.rows);
    } catch (e) {
        console.error(e.message)
    }
})

app.post('/todos', async(req, res) =>{
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo);
    } catch (e) {
        console.error(e.message)
    }
})

app.get('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
        res.json(todo.rows[0]);
    } catch (e) {
        console.error(e.message)
    }
})

app.put('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2", [description, id]);
        res.json("Updated todo");
    } catch (e) {
        console.error(e.message)
    }
})

app.delete('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
        res.json("Deleted todo");
    } catch (e) {
        console.error(e.message)
    }
})


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server listening on port ', PORT);
})



