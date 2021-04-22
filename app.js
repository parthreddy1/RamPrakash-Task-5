require("dotenv").config()
const express = require("express")
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require("cors")
const listRoutes = require("./Routes/lists");

//Middlewares
app.use(bodyParser.json())
app.use(cors())

//Routes

app.use("/lists", listRoutes)
app.get('/', (req, res) => {

    res.send("SERVER IS UP 😃")
})

//LISTEN
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, () => {
    console.log("CONNECTED TO Database")
})
//LISTEN
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started at port: ${port}`);
});
