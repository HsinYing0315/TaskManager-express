const express = require('express')
const cors = require('cors')
const app = express()

const router = require('./routes/task.route')

const port = process.env.PORT || 8080
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/u', router)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
