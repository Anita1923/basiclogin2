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

function register(requsername, reqpassword, reqname, reqemail) {
  dbUsers.push({
      username: requsername,
      password: reqpassword,
      name: reqname,
      email: reqemail
  })
}

const express = require('express')
const app = express()
const port = 3005
const jwt = require('jsonwebtoken');

app.use(express.json())

app.post('/login', (req, res) => {
  console.log(req.body)

  let result = login(
    req.body.username,
    req.body.password
  )
  //res.send(result)

  let token = generateToken(result)
  res.send(token)
})


app.get('/', (req, res ) => {
  res.send('Hi World!')
})

app.get('/bye', verifyToken, (req, res, next) => {
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


function generateToken(userData) {
  const token = jwt.sign(
    userData,
    'inipassword'
    
  );
  return token

}

function verifyToken(req, res, next) {
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'inipassword', function(err, decoded){
    if(err){
      res.send("Invalid Token")
    }

    req.user = decoded
    next()
  });

}