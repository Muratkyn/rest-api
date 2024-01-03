const express = require ('express')
const app = express()
app.use(express.json())

let userList = [
    {
        id: 1,
        name: "Murat",
        age: 29,
        married: false
    },
    {
        id: 2,
        name: "Dean",
        age: 38,
        married: true
    },
    {
        id: 3,
        name: "Meg",
        age: 24,
        married: false
    }
]

app.get('/users', (req, res) => {
    res.json(userList)
})

app.post('/users', (req, res) => {
    const newUser = req.body
    userList.push(newUser)
    res.json(userList)
})

app.listen('3001', ()=> {
    console.log("app runs")
})