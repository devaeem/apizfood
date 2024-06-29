const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const connectToDatabase  = require('./config/mongo');

const app = express();

const port = 3001;
app.use(morgan("dev"));
app.use(cors());
connectToDatabase();
app.use(bodyParser.json({ limit: "20mb" }));

app.get('/', (req, res) => {
 res.send('Hello World');
});

app.use('/api/', require('./route/category'));

app.listen(3001, () => {
 console.log(`Server is running on port ${port}`);
});

