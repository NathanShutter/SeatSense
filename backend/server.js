const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const db = require("./models");
const path = require('path');

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/build')));

// Routers
const userRouter = require('./routes/User');
const loginRouter = require('./routes/Login');
const signUpRouter = require('./routes/Signup');
const dashboardRouter = require('./routes/auth/Dashboard');
const clientRouter = require('./routes/Client');
const profileRouter = require('./routes/Profile');
const passwordRouter = require('./routes/PasswordReset');
const sensorRouter = require('./routes/SensorData');
const phoneRouter = require('./routes/PhoneCall');
const signUpPageRoute = require('./routes/SignUpPage');
const passwordResetPageRoute = require('./routes/PasswordResetPage');
const newClientRoute = require('./routes/NewClient');
const allClientsRoute = require('./routes/AllClients');
const allUsersRoute = require('./routes/AllUsers');
const createClientRoute = require('./routes/CreateClient');
const clientUserRoute = require('./routes/AssociateClientUser');

app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/dashboard", dashboardRouter);
app.use("/client", clientRouter);
app.use("/profile", profileRouter);
app.use("/password-reset", passwordRouter);
app.use("/phone-call", phoneRouter);
app.use("/signup-page", signUpPageRoute);
app.use("/password-reset-page", passwordResetPageRoute);
app.use("/sensor-data", sensorRouter);
app.use("/new-client", newClientRoute);
app.use("/all-clients", allClientsRoute);
app.use("/all-users", allUsersRoute);
app.use("/root-dash", signUpPageRoute);
app.use("/create-client", createClientRoute);
app.use("/associate-client-user", clientUserRoute);

async function createRootUser() {
  try {
    // Check if Root User already exists
    const existingRootUser = await db.User.findOne({ where: { role: 'root' } });
    if (existingRootUser) {
      console.log('Root User already exists');
      return;
    }

    // If Root User does not exist, create it
    const firstName = 'Root';
    const lastName = 'User';
    const email = 'root@test.com';
    const password = 'rootpassword';

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the Root User account
    await db.User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'root',
    });

    console.log('Root User account created successfully');
  } catch (error) {
    console.error('Error creating Root User account:', error);
  }
}

async function startServer() {
  try {
    // Synchronize database models
    await db.sequelize.sync();

    // Create Root User if it doesn't exist
    await createRootUser();

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

// Start the server
startServer();
