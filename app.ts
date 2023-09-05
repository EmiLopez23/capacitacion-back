import express from 'express'
import router from './routes'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(router)
app.listen(3001,() => console.log('Server running on port 3001'))