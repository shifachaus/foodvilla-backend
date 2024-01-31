const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const apiRoutes = require("./routes/restaurant");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
