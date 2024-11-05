const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const dbConfig = require('./config/dbconfig');
const port = process.env.PORT || 5000;
const userRoute = require('./routes/userRoute');
const bookRoute = require('./routes/bookRoute');
const issueRoute = require('./routes/issueRoute');



app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);
app.use('/api/Issues', issueRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});