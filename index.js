const PORT = process.env.PORT || 5000

const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('welcome'))


app.listen(PORT, () => console.log(`Listening on ${PORT}`))
