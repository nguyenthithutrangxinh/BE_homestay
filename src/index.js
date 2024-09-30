const express = require("express");
const db = require("./config/db");
const app = express();
const cors = require("cors");

const authRoute = require("./routes/user");

db.connect();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
