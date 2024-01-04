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

app.put('/users', (req, res) => {

    const newName = req.body.newName
    for (let i = 1; i < userList.length-1; i++){
        userList[i].name = newName
    }
    res.json(userList)
})

app.delete('/users/:id', (req, res) => {
    
    const id = req.params.id;
    for (let i = 0; i < userList.length; i++) {
        if(userList[i].id == id ) {
            userList.splice(i, 1)
        }
    }
    res.json(userList)
})

app.listen('3001', ()=> {
    console.log("app runs")
})