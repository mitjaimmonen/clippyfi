const express = require('express')
const app = express()
const port = 3000

app.get('/api/prompt', (req, res) => {
  res.send('Clippy would not show advertisements on your fridge')
})

app.listen(port, () => {
  console.log(`Clippy app listening on port ${port}`)
})
