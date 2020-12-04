const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('welcome'))


app.listen(5000, () => console.log(`Listening on 5000`))
