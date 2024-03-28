const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const db = require("./models");

app.use(express.json());

// Routers
const userRouter = require('./routes/User')
app.use("/user", userRouter)

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});  

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});