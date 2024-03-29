const express = require ('express')
const app = express()
app.use(express.json())


const logMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}` )
    next()
}

 // app.use(logMiddleware);
 // GET - /users/1 we log the base url we r getting with the request. 

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

app.get('/users', logMiddleware, (req, res) => {
    res.json(userList)
})

app.get('/users/:id', logMiddleware, (req,res) => {
    console.log(req.params)
    const userId = req.params.id
    const parsedId = parseInt(userId) // before we were getting string ids in the console 
    const findId = userList.find(user => user.id === parsedId)
    if(!findId) 
    return res.status(400).sendStatus(404)
    return res.status(201).send(findId)
})

/* query params

app.get('/users', (req,res) => {
    console.log(req.query)
    const { query: {filter, value} } = req
    if(!filter && !value) return res.send(userList)
    if(filter && value) return res.send (
        userList.filter(user => user[filter].includes(value))
    )
    
})

*/



app.post('/users', (req, res) => {
    const newUser = req.body
    userList.push(newUser)
    res.send(userList)
})

app.put('/users', (req, res) => {

    const newName = req.body.newName
    for (let i = 1; i < userList.length-1; i++){
        userList[i].name = newName
    }
    res.json(userList)
})

///updating a user Put request
app.put('/users/:id', (req,res) => {
    const { body, params: { id } } = req
    const parsedId = parseInt(id)
    if( isNaN(parsedId)) return res.sendStatus(400)
    const findIndex = userList.findIndex(user => user.id === parsedId )
    userList[findIndex] = { id: parsedId, ...body }
    return res.status(201)
})

/// Patch Request 

app.patch('/users/:id', (req,res) => {
    const { body, params: { id } } = req
    const parsedId = parseInt(id)
    if( isNaN(parsedId)) return res.sendStatus(400)
    const findIndex = userList.findIndex(user => user.id === parsedId )
    userList[findIndex] = { ...userList[findIndex], ...body }
    return res.status(201)
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