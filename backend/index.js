const express = require('express');
const cors= require('cors');


const router= require('./routes/index')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', router)

app.listen(3000, () => {
    console.log("the server is running on port 3000")
})
