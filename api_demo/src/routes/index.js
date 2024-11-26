const express = require("express")
const router = express.Router()

// 取得 新增  更新  刪除
// get  post  put  delete

// todo資料
let todos = [
    {
        id: 1,
        title: "買可樂",
        completed: false
    }
]

//取得所有todo GET /api/todos
router.get("/todos", (req, res) => {
    res.json(todos)
})

//新增todo POST /api/todos
router.post("/todos", (req, res) => {
    const { title } = req.body
    const newTodo = {
        id: todos.length + 1,
        title,
        completed: false
    }
    todos.push(newTodo)
    res.status(201).json(newTodo)
})

//更新todo PUT /api/todos/id
router.put("/todos/:id", (req, res) => {
    const { id } = req.params
    const { title, completed } = req.body

    const todo = todos.find((t) => t.id === parseInt(id))

    if (!todo) {
        return res.status(404).json({ error: "ㄔㄨㄟˇ謀季雷id" })
    }

    todo.title = title || todo.title
    todo.completed = completed ?? todo.completed

    res.json(todo)
})




//刪除 todo DELETE /api/todos/id
router.delete("/todos/:id", (req, res) => {
    const { id } = req.params
    todos = todos.filter((t) => t.id !== parseInt(id))
    res.status(204).send()
})




module.exports = router