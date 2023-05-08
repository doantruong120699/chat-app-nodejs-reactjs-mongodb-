const express = require("express");
const app = express();
// const userRoutes = require("./routes/userRoutes");
// const User = require("./models/User");
// const Message = require("./models/Message");
// const rooms = ["general", "tech", "finance", "crypto"];
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use("/users", userRoutes);
// require("./connection");

const server = require("http").createServer(app);
const PORT = 3001;

// socket connection

server.listen(PORT, () => {
  console.log("listening to port", PORT);
});

app.get('/', (req, res) => { 
  res.send('Hello!')
})
