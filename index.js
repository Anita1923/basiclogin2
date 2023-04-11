let dbUsers = [
  {
      username: "anita",
      password: "192329",
      name: "Anita",
      email:"anita@utem.edu.my"
  },
  {
      username: "jeev",
      password: "230500",
      name: "Jeev",
      email:"jeev@utem.edu.my"
  },
  {
      username: "mark",
      password: "190600",
      name: "Mark",
      email:"mark@utem.edu.my"
  }
]

function login(username, password) {
  //let matchUser= dbUsers.find(user => user.username == username)
  let matchUser= dbUsers.find(x => x.username == username)
  if(!matchUser) return "User not found!"
  if(matchUser.password==password){
      return matchUser
  } else {
      return "Invalid password"
  }
} 

function register(username, password, name, email) {
  dbUsers.push({
      username: username,
      password: password,
      name: name,
      email: email
  })
}

const express = require('express')
const app = express()
const port = 3000


app.use(express.json())

app.post('/login', (req, res) => {
  console.log(req.body)

  res.send('Login')
})


app.get('/', (req, res) => {
  res.send('Hi World!')
})

app.get('/bye', (req, res) => {
  res.send('bye World!')
})

app.post('/register', (req, res) => {
  let result=register(
    req.body.username,
    req.body.password,
    req.body.name,
    req.body.email
  )
  
  res.send('ACCOUNT CREATED!')
})

app.listen(port, () => {
  console.log('Example app listening on port ${port}')
})
