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
  res.send('ACCOUNT CREATED!')
})

app.listen(port, () => {
  console.log('Example app listening on port ${port}')
})