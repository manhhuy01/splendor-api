const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('welcome'))


app.listen(3001, () => console.log(`Listening on 3001`))
