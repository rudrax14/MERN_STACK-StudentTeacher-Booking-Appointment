const express = require("express");
const app = express();

// cors
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });


// middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
const connectToMongo = require("./db");
connectToMongo();




app.get("/", (req, res) => {
  res.send("Welcome to the Tutor-Time API!");
});


// mouting routes
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/messages", messageRoutes);

// global catch
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("App listening on port " + port);
});