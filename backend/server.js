const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");

const db = require("./models");

app.use(express.json());
app.use(cors());

// Routers
const userRouter = require('./routes/User');
const loginRouter = require('./routes/Login');
const signUpRouter = require('./routes/Signup');
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});  

