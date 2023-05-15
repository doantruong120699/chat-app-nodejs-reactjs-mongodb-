const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
const authRouter = require('./routers/auth.routers');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use('/api/auth', authRouter);
const PORT = 3001;

app.listen(PORT, () => {
  console.log("listening to port", PORT);
});
