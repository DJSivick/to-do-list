const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')
const {v4 : uuidv4} = require('uuid') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//app.use(cors())
app.use(express.json())

//get all todos
app.get('api/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(todos.rows)
    }
    catch(err){
        console.log(err)
    }
})

//Create new todo
app.post('api/todos', async (req, res) =>{
    const {user_email, title, progress, date, description, status} = req.body
    const id = uuidv4()

    try {
        const newToDo = pool.query(`INSERT INTO todos(id, user_email, title, progress, date, description, status) VALUES($1, $2, $3, $4, $5, $6, $7)`, [id, user_email, title, progress, date, description, status])
        res.json(newToDo)
    } catch (err) {
        console.error(err)
    }
})

//Edit existing todo
app.put('api/todos/:id', async (req, res) =>{
    const {id} = req.params
    const {user_email, title, progress, date, description, status} = req.body

    try {
        const updateToDo = pool.query(`UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4, description=$6, status=$7 WHERE id = $5`, [user_email, title, progress, date, id, description, status])
        res.json(updateToDo)        
    } catch (err) {
        console.error(err)
    }
})

//Delete existing todo
app.delete('api/todos/:id', async (req, res) => {
    const {id} = req.params

    try {
        const deleteToDo = pool.query(`DELETE FROM todos WHERE id = $1`, [id])
        res.json(deleteToDo)

    } catch (err) {
        console.error(err)
    }
})


//Authentication Endpoints
//Sign Up
app.post('api/signup', async(req, res) => {
    const {email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`, [email, hashedPassword])
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
        res.json({email, token})
    } catch (err) {
        console.error(err)
        if(err){
            res.json({detail: err.detail })
        }
    }
})

//Login
app.get('api/login', async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])

        if(!user.rows.length) return res.json({detail: 'User does not exist'})

        const success = await bcrypt.compare(password, user.rows[0].hashed_password)
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})


        if(success){
            res.json({'email': user.rows[0].email, token})
        }
        else{
            res.json({detail: "Login failed"})
        }
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))