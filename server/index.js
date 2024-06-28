const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connectDB')

require('dotenv').config()

const routes = require('./routes/index.js');

const app = express()
app.use(express.json());

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))


const PORT = process.env.PORT || 8080

app.get('/', (req,res) => {
    res.json({
        message : `Server is running on PORT no. ${PORT}`
    })
})

// add api endpoints
app.use('/api',routes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT no. ${PORT}`);
    })
})

