const express = require("express");
const app = express();
const db = require("./models");

const cors = require("cors");
app.use(express.json()); // to make express parss json
//Routers
app.use(cors());
const bookRouter = require("./routes/Books");
const publisherRouter = require("./routes/Publishers");
const authorRouter = require("./routes/Authors");
const buyerRouter = require("./routes/Buyers");
const reserveRouter = require("./routes/Reservs");

app.use("/books", bookRouter);
app.use("/publishers", publisherRouter);
app.use("/authors", authorRouter);
app.use("/buyers", buyerRouter);
app.use("/reserves", reserveRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server is running adasd");
  });
});
