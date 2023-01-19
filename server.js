const express = require('express')
const dotenv = require('dotenv')
const app = express();
const cors = require('cors')
app.use(cors({origin: '*'}))
app.use(express.json());
require('./database/connect')
require('./database/adminschema')
app.use(require('./routes/route'));
dotenv.config({path:'./config.env'})

const port = process.env.port;

console.log(port)


app.listen(port)
