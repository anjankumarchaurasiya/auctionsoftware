require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/config/database');
const routes = require('./src/routes/index');
 
 
const app = express();
const PORT = process.env.PORT || 5000;  

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);
 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

 
db.getConnection((err, connection) => {
  if (err) {
      console.error('Error connecting to the database:', err);
      return;
  }
  connection.release();  
});
