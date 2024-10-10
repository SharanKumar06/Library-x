const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const dbConfig = require('./config/dbconfig');
const port = process.env.PORT || 5000;
const userRoute = require('./routes/userRoute');

app.use('/api/users', userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});