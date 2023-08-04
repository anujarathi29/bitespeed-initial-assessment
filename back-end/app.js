const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require("./db/db.js")
const contactRouter = require("./routes/contactRouter.js")

var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  app.use("/identify",contactRouter)


app.listen(8000, function () {
	console.log("Server running at 8000");
});